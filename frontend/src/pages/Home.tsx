import React from "react";
import { Link } from "react-router";
import { Card } from "../components/common/Card";
import { Loading } from "../components/common/Loading";
import { useCategories } from "../hooks/useCategories";
import { kebabToTitleCase } from "../utils/stringUtils";

export const Home: React.FC = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <Loading text="Loading categories..." />;
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Error
          </h2>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome to Forum
        </h1>
        <p className="text-text-secondary">Explore our community categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <Link to={`/category/${category.name}`}>
              <div className="card-header">
                <h3 className="card-title text-lg">
                  {kebabToTitleCase(category.name)}
                </h3>
                <p className="card-subtitle">{category.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">
                  Click to explore
                </span>
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No Categories
          </h3>
          <p className="text-text-secondary">
            No categories available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};
