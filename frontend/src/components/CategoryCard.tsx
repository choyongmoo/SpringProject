import React from "react";
import { Link } from "react-router";
import { Card } from "./common/Card";

interface CategoryCardProps {
    category: {
        name: string;
        description: string;
    };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link to={`/category/${category.name}`}>
                <div className="card-header">
                    <h3 className="card-title text-lg">
                        {category.name.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    </h3>
                    <p className="card-subtitle">{category.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">
                        클릭하여 탐색
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
    );
}; 