import { useParams } from "react-router";
import { useState } from "react";
import PostCard from "../../components/category/PostCard";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import { categories } from "../../data/categories";
import AddPostModal from "../../components/modals/AddPostModal";

export default function Category() {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredPosts = category.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            onClick={() => setIsAddPostOpen(true)}
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
      />
    </>
  );
}