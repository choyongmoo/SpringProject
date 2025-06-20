import PostCard from "../../components/category/PostCard";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import AddPostModal from "../../components/modals/AddPostModal";
import SigninModal from "../../components/modals/SigninModal";
import { useCategoryPage } from "../../hooks/useCategoryPage";

export default function Category() {
  const {
    searchQuery,
    setSearchQuery,
    isAddPostOpen,
    setIsAddPostOpen,
    isSigninOpen,
    setIsSigninOpen,
    category,
    filteredPosts,
    handleAddPostClick,
    refreshPosts,
  } = useCategoryPage();

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search posts in this category..."
            />
          </div>
          <Button variant="primary">
            Search
          </Button>
          <Button
            variant="outline"
            onClick={handleAddPostClick}
          >
            Add Post
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {filteredPosts.length} Posts
          </h2>
        </div>

        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              categoryName={category.name}
            />
          ))}
        </div>
      </div>

      <AddPostModal
        isOpen={isAddPostOpen}
        onClose={() => setIsAddPostOpen(false)}
        categoryName={category.name}
        onSuccess={refreshPosts}
      />

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
      />
    </>
  );
}