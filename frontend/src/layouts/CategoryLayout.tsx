import { Outlet, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import ArrowButton from "../components/common/ArrowButton";
import { categoryService } from "../services/categoryService";
import type { CategoryResponse } from "../services/categoryService";

export default function CategoryLayout() {
  const { categoryName } = useParams();
  const [category, setCategory] = useState<CategoryResponse | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryName) return;
      try {
        const categoryData = await categoryService.getCategory(categoryName);
        setCategory(categoryData);
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    };
    fetchCategory();
  }, [categoryName]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start gap-4">
          <ArrowButton to="/" className="mt-1" />
          <div>
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="text-3xl font-bold text-white mb-2 hover:text-primary-light transition-colors inline-block"
            >
              {category.name}
            </Link>
            <p className="text-gray-400 text-lg">{category.description}</p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}