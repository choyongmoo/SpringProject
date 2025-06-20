import React, { useState } from "react";
import { Button, CategoryCard, CategoryForm, Loading } from "../components/common";
import { useAuth } from "../hooks/useAuth";
import { useCategories } from "../hooks/useCategories";
import { createCategory } from "../services/categoryService";

export const Home: React.FC = () => {
  const { categories, loading, error, refetch } = useCategories();
  const { isAuthenticated } = useAuth();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      await createCategory({
        name: formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
      });
      setFormData({ name: "", description: "" });
      setShowCreateModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormData((prev) => ({ ...prev, description }));
  };

  if (loading) {
    return <Loading text="카테고리를 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            오류
          </h2>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              홈
            </h1>
            <p className="text-text-secondary">커뮤니티 카테고리를 탐색해보세요</p>
          </div>
          {isAuthenticated && (
            <Button
              onClick={() => setShowCreateModal(true)}
              variant="primary"
            >
              카테고리 추가
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            카테고리가 없습니다
          </h3>
          <p className="text-text-secondary">
            {isAuthenticated
              ? "첫 번째 카테고리를 생성해보세요!"
              : "현재 사용 가능한 카테고리가 없습니다."}
          </p>
        </div>
      )}

      <CategoryForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        name={formData.name}
        description={formData.description}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};
