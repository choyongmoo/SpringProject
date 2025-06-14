import { useParams } from "react-router";
import { useState } from "react";
import { categories } from "../../data/categories";
import { replies } from "../../data/replies";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import ReplyCard from "../../components/category/ReplyCard";

export default function Post() {
  const { categoryName, postId } = useParams();
  const [comment, setComment] = useState("");

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

  const post = category?.posts.find((p) => p.id === postId);
  const postReplies = replies.filter((reply) => reply.postId === postId);

  if (!category || !post) {
    return <div>Post not found</div>;
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    console.log("Submitting comment:", comment);
    setComment("");
  };

  return (
    <div className="space-y-6">
      <Card variant="primary" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Posted by {post.author}</span>
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
          {postReplies.length} Replies
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
        {postReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}