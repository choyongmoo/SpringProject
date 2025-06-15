import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import ReplyCard from "../../components/category/ReplyCard";
import SigninModal from "../../components/modals/SigninModal";
import { useAuth } from "../../contexts/AuthContext";
import { postService } from "../../services/postService";
import type { PostResponse } from "../../services/postService";
import type { CommentResponse } from "../../services/postService";

export default function Post() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState<PostResponse | null>(null);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!postId) return;
      try {
        const postData = await postService.getPost(Number(postId));
        setPost(postData);
        const commentsData = await postService.getComments(Number(postId));
        setComments(commentsData.comments);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };
    fetchPostAndComments();
  }, [postId]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsSigninOpen(true);
      return;
    }
    if (!postId) return;
    try {
      await postService.createComment(Number(postId), { content: comment });
      const commentsData = await postService.getComments(Number(postId));
      setComments(commentsData.comments);
      setComment("");
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Card variant="primary" className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Posted by {post.authorName}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>

          <div className="text-gray-300">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {comments.length} Replies
          </h2>
        </div>

        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your reply..."
              className="w-full h-32 bg-background-dark text-white rounded-lg p-4 
                       border border-gray-700 focus:border-primary focus:outline-none 
                       transition-colors placeholder-gray-500 resize-none"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="primary" type="submit">
              Post Reply
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <ReplyCard key={comment.id} reply={comment} />
          ))}
        </div>
      </div>

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
      />
    </>
  );
}