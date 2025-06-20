import CategoryCard from "../components/home/CategoryCard";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import SigninModal from "../components/modals/SigninModal";
import { useHomePage } from "../hooks/useHomePage";

export default function Home() {
  const {
    isAddCategoryOpen,
    setIsAddCategoryOpen,
    isSigninOpen,
    setIsSigninOpen,
    searchQuery,
    setSearchQuery,
    filteredCategories,
    handleAddCategoryClick,
    refreshCategories,
  } = useHomePage();

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex gap-4 items-center">
            <div className="flex-1">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search categories..."
              />
            </div>
            <Button variant="primary">
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleAddCategoryClick}
            >
              Add Category
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white mb-8">
              {filteredCategories.length} Categories
            </h2>
          </div>

          <div className="grid gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSuccess={refreshCategories}
      />

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
      />
    </>
  );
}