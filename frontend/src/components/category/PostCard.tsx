import { Link } from "react-router";
import Card from "../common/Card";
import type { PostResponse } from "../../services/postService";

interface PostCardProps {
  post: PostResponse;
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
              <span>Posted by {post.authorName}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 