import { useState } from "react";
import CategoryCard from "../components/home/CategoryCard";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import { categories } from "../data/categories";
import AddCategoryModal from "../components/modals/AddCategoryModal";

export default function Home() {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Searching for:", query);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex gap-4 items-center">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search posts across all categories..."
              />
            </div>
            <Button variant="primary">
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAddCategoryOpen(true)}
            >
              Add Category
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white mb-8">
              {categories.length} Categories
            </h2>
          </div>

          <div className="grid gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      />
    </>
  );
}