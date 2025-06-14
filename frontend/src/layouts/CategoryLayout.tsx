import { Outlet, useParams, Link } from "react-router";
import { categories } from "../data/categories";
import ArrowButton from "../components/common/ArrowButton";

export default function CategoryLayout() {
  const { categoryName } = useParams();
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

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