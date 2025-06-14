import { useState } from 'react';
import Category from './Category';
import { categories } from '../../data/mockData';
import AddCategoryModal from '../../components/modals/AddCategoryModal';
import AddPostModal from '../../components/modals/AddPostModal';
import Button from '../../components/common/Button';
import AddButton from '../../components/common/AddButton';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null);

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log('Searching for:', searchQuery);
  };

  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleAddPost = (categoryId: number, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setShowAddPostModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search categories and posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-green-500"
            />
            <svg
              className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Button
            onClick={handleSearch}
            variant="primary"
          >
            Search
          </Button>
        </div>
        <hr className="mt-8 border-gray-700" />
      </div>

      {/* Add Category Button */}
      <div className="mb-6">
        <AddButton
          onClick={handleAddCategory}
          fullWidth
        >
          Add Category
        </AddButton>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <Category
            key={category.id}
            {...category}
            onAddPost={() => handleAddPost(category.id, category.name)}
          />
        ))}
      </div>

      {/* Modals */}
      {showAddCategoryModal && (
        <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} />
      )}

      {showAddPostModal && selectedCategory && (
        <AddPostModal
          onClose={() => {
            setShowAddPostModal(false);
            setSelectedCategory(null);
          }}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
        />
      )}
    </div>
  );
}