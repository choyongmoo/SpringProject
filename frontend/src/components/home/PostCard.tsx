import { Link } from "react-router";
import Card from "../common/Card";
import type { Post } from "../../data/categories";

interface PostCardProps {
  post: Post;
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
              <span>Posted by {post.author}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>{post.replies}</span>
            <span className="text-sm">replies</span>
          </div>
        </div>
      </Card>
    </Link>
  );
} 