import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Loading } from "../../components/common/Loading";
import { Textarea } from "../../components/common/Textarea";
import { useAuth } from "../../hooks/useAuth";
import { usePost, usePostComments } from "../../hooks/usePosts";
import { deleteComment } from "../../services/commentService";
import { createComment, deletePost } from "../../services/postService";

export const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { post, loading: postLoading } = usePost(Number(postId));
  const {
    postComments,
    loading: commentsLoading,
    refetch,
  } = usePostComments(Number(postId));
  const { isAuthenticated, user } = useAuth();

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );
  const [deletingPost, setDeletingPost] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;

    setSubmitting(true);
    try {
      await createComment(Number(postId), {
        content: commentContent,
      });
      setCommentContent("");
      setShowCommentForm(false);
      refetch();
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
      refetch();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleDeletePost = async () => {
    setDeletingPost(true);
    try {
      await deletePost(Number(postId));
      navigate(`/category/${post?.categoryName}`);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setDeletingPost(false);
    }
  };

  if (postLoading || commentsLoading) {
    return <Loading text="Loading post..." />;
  }

  if (!post) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Post Not Found
          </h2>
          <p className="text-text-secondary">
            The post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          to={`/category/${post.categoryName}`}
          className="text-accent-primary hover:text-accent-secondary transition-colors mb-4 inline-block"
        >
          ← Back to Category
        </Link>
      </div>

      <Card className="mb-8">
        <div className="card-header">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="card-title text-2xl">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span>By {post.authorName}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {isAuthenticated && user?.username === post.authorName && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeletePost}
                loading={deletingPost}
                className="ml-4 flex-shrink-0"
              >
                Delete Post
              </Button>
            )}
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-primary whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            Comments ({postComments?.comments?.length || 0})
          </h2>
          {isAuthenticated && (
            <Button
              onClick={() => setShowCommentForm(!showCommentForm)}
              variant="primary"
              size="sm"
            >
              {showCommentForm ? "Cancel" : "Add Comment"}
            </Button>
          )}
        </div>
      </div>

      {showCommentForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              label="Your Comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
              placeholder="Write your comment..."
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                loading={submitting}
                disabled={!commentContent.trim()}
              >
                Post Comment
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowCommentForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {postComments?.comments?.map((comment) => (
          <Card key={comment.id}>
            <div className="flex items-start gap-3">
              <div className="avatar-sm bg-bg-tertiary flex items-center justify-center text-text-secondary font-semibold">
                {comment.authorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">
                      {comment.authorName}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {isAuthenticated && user?.username === comment.authorName && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      loading={deletingCommentId === comment.id}
                    >
                      Delete
                    </Button>
                  )}
                </div>
                <p className="text-text-primary whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {postComments?.comments?.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No Comments
          </h3>
          <p className="text-text-secondary">
            {isAuthenticated
              ? "Be the first to comment on this post!"
              : "No comments yet. Sign in to add a comment."}
          </p>
        </div>
      )}
    </div>
  );
};
