import { Link } from "react-router";
import { useState, useEffect } from "react";
import Card from "../common/Card";
import PostCard from "./PostCard";
import type { CategoryResponse } from "../../services/categoryService";
import type { PostResponse } from "../../services/postService";
import { categoryService } from "../../services/categoryService";

interface CategoryCardProps {
  category: CategoryResponse;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await categoryService.getAllPosts(category.name);
      setPosts(response.posts);
    };
    fetchPosts();
  }, [category.name]);

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
        {posts.map((post) => (
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