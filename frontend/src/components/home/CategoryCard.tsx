import { Link } from "react-router";
import Card from "../common/Card";
import PostCard from "./PostCard";
import type { Category } from "../../data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card
      variant="primary"
      className="max-w-6xl transition-all duration-300 border-2 border-transparent hover:border-primary hover:shadow-lg"
    >
      <div className="mb-4">
        <Link
          to={`/category/${category.name.toLowerCase()}`}
          className="text-xl font-semibold text-primary hover:text-primary-light transition-colors"
        >
          {category.name}
        </Link>
        <p className="text-gray-400 text-sm mt-1">{category.description}</p>
      </div>

      <div className="grid gap-4">
        {category.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            categoryName={category.name}
          />
        ))}
      </div>
    </Card>
  );
} 