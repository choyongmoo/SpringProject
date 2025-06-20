import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Loading } from "../components/common/Loading";
import { Modal } from "../components/common/Modal";
import { Textarea } from "../components/common/Textarea";
import { useAuth } from "../hooks/useAuth";
import { useCategories } from "../hooks/useCategories";
import { createCategory } from "../services/categoryService";
import { kebabToTitleCase } from "../utils/stringUtils";

export const Home: React.FC = () => {
  const { categories, loading, error, refetch } = useCategories();
  const { isAuthenticated, user } = useAuth();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="새 카테고리 생성"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="카테고리명"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="카테고리명을 입력하세요"
            helperText="카테고리명은 자동으로 URL 친화적인 형태로 변환됩니다"
          />

          <Textarea
            label="설명"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="카테고리에 대한 설명을 입력하세요"
          />

          <div className="flex gap-3">
            <Button
              type="submit"
              loading={submitting}
              disabled={!formData.name.trim() || !formData.description.trim()}
            >
              카테고리 생성
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
