import { Link } from "react-router";
import Card from "../common/Card";
import type { PostResponse } from "../../services/postService";

interface PostCardProps {
  post: PostResponse;
  categoryName: string;
}

export default function PostCard({ post, categoryName }: PostCardProps) {
  return (
    <Link
      to={`/category/${categoryName.toLowerCase()}/${post.id}`}
    >
      <Card variant="secondary">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-medium">{post.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>Posted by {post.authorName}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 