import { Link } from "react-router";
import Card from "../common/Card";
import type { Post } from "../../data/categories";

interface PostCardProps {
  post: Post;
  categoryName: string;
}

export default function PostCard({ post, categoryName }: PostCardProps) {
  return (
    <Link to={`/category/${categoryName.toLowerCase()}/${post.id}`}>
      <Card variant="primary" className="hover:bg-background-light transition-colors">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <h3 className="text-white font-medium text-lg">{post.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Posted by {post.author}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
              {post.lastReplyAt && (
                <>
                  <span>•</span>
                  <span>Last reply {post.lastReplyAt}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 shrink-0">
            <span className="font-medium">{post.replies}</span>
            <span className="text-sm">replies</span>
          </div>
        </div>
      </Card>
    </Link>
  );
} 