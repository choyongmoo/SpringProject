import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Card, CommentCard, CommentForm, Loading, PostForm } from "../../components/common";
import { useAuth } from "../../hooks/useAuth";
import { usePost, usePostComments } from "../../hooks/usePosts";
import { deleteComment, updateComment } from "../../services/commentService";
import { createComment, deletePost, updatePost } from "../../services/postService";

export const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { post, loading: postLoading, refetch: refetchPost } = usePost(Number(postId));
  const {
    postComments,
    loading: commentsLoading,
    refetch: refetchComments,
  } = usePostComments(Number(postId));
  const { isAuthenticated, user } = useAuth();

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);
  const [deletingPost, setDeletingPost] = useState(false);

  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [updatingComment, setUpdatingComment] = useState(false);

  // 게시글 수정 관련 상태
  const [editingPost, setEditingPost] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
  });
  const [updatingPost, setUpdatingPost] = useState(false);

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
      refetchComments();
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
      refetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleEditComment = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editingContent.trim()) return;

    setUpdatingComment(true);
    try {
      await updateComment(commentId, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent("");
      refetchComments();
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setUpdatingComment(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleEditPost = () => {
    if (!post) return;
    setEditingPost(true);
    setEditFormData({
      title: post.title,
      content: post.content,
    });
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !editFormData.title.trim() || !editFormData.content.trim()) return;

    setUpdatingPost(true);
    try {
      await updatePost(Number(postId), {
        title: editFormData.title,
        content: editFormData.content,
      });
      setEditingPost(false);
      setEditFormData({ title: "", content: "" });
      refetchPost();
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setUpdatingPost(false);
    }
  };

  const handleCancelEditPost = () => {
    setEditingPost(false);
    setEditFormData({ title: "", content: "" });
  };

  const handleTitleChange = (title: string) => {
    setEditFormData((prev) => ({ ...prev, title }));
  };

  const handleContentChange = (content: string) => {
    setEditFormData((prev) => ({ ...prev, content }));
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
    return <Loading text="게시글을 불러오는 중..." />;
  }

  if (!post) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            게시글을 찾을 수 없습니다
          </h2>
          <p className="text-text-secondary">
            요청하신 게시글이 존재하지 않습니다.
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
          ← 카테고리로 돌아가기
        </Link>
      </div>

      <Card className={`mb-8 ${isAuthenticated && user?.username === post.authorName ? 'border-2 border-accent-primary' : ''}`}>
        {editingPost ? (
          <PostForm
            title={editFormData.title}
            content={editFormData.content}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onSubmit={handleUpdatePost}
            onCancel={handleCancelEditPost}
            submitting={updatingPost}
            submitText="수정 완료"
            titlePlaceholder="게시글 제목을 입력하세요"
            contentPlaceholder="게시글 내용을 작성하세요..."
          />
        ) : (
          <>
            <div className="card-header">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="card-title text-2xl">{post.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>작성자: {post.authorName}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {isAuthenticated && user?.username === post.authorName && (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleEditPost}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleDeletePost}
                      loading={deletingPost}
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-primary whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </>
        )}
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            댓글 ({postComments?.comments?.length || 0})
          </h2>
          {isAuthenticated && (
            <Button
              onClick={() => setShowCommentForm(!showCommentForm)}
              variant="primary"
              size="sm"
            >
              {showCommentForm ? "취소" : "댓글 작성"}
            </Button>
          )}
        </div>
      </div>

      {showCommentForm && (
        <CommentForm
          content={commentContent}
          onContentChange={setCommentContent}
          onSubmit={handleSubmitComment}
          onCancel={() => setShowCommentForm(false)}
          submitting={submitting}
        />
      )}

      <div className="space-y-4">
        {postComments?.comments?.map((comment) => (
          <div
            key={comment.id}
            className={`${isAuthenticated && user?.username === comment.authorName ? 'border-2 border-accent-primary rounded-lg' : ''}`}
          >
            <CommentCard
              comment={comment}
              isEditing={editingCommentId === comment.id}
              editingContent={editingContent}
              onEdit={handleEditComment}
              onUpdate={handleUpdateComment}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDeleteComment}
              onContentChange={setEditingContent}
              isAuthor={isAuthenticated && user?.username === comment.authorName}
              updatingComment={updatingComment}
              deletingCommentId={deletingCommentId}
            />
          </div>
        ))}
      </div>

      {postComments?.comments?.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            댓글이 없습니다
          </h3>
          <p className="text-text-secondary">
            {isAuthenticated
              ? "이 게시글의 첫 번째 댓글을 작성해보세요!"
              : "아직 댓글이 없습니다. 로그인하여 댓글을 작성하세요."}
          </p>
        </div>
      )}
    </div>
  );
};
