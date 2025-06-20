import { useParams } from "react-router";
import { useState, useEffect } from "react";
import PostCard from "../../components/category/PostCard";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import AddPostModal from "../../components/modals/AddPostModal";
import SigninModal from "../../components/modals/SigninModal";
import { useAuth } from "../../contexts/AuthContext";
import { categoryService } from "../../services/categoryService";
import type { CategoryResponse } from "../../services/categoryService";
import type { PostResponse } from "../../services/postService";

export default function Category() {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      if (!categoryName) return;
      try {
        const categoryData = await categoryService.getCategory(categoryName);
        setCategory(categoryData);
        const postsData = await categoryService.getAllPosts(categoryName);
        setPosts(postsData.posts);
      } catch (error) {
        console.error('Failed to fetch category data:', error);
      }
    };
    fetchCategoryAndPosts();
  }, [categoryName]);

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPostClick = () => {
    if (!isAuthenticated) {
      setIsSigninOpen(true);
      return;
    }
    setIsAddPostOpen(true);
  };

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
        onSuccess={() => {
          const fetchPosts = async () => {
            const postsData = await categoryService.getAllPosts(category.name);
            setPosts(postsData.posts);
          };
          fetchPosts();
        }}
      />

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
      />
    </>
  );
}