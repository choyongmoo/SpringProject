import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { Button, Card, Loading, PostForm } from "../../components/common";
import { useAuth } from "../../hooks/useAuth";
import { useCategory, useCategoryPosts } from "../../hooks/useCategories";
import { createPost } from "../../services/categoryService";
import { deletePost } from "../../services/postService";
import { kebabToTitleCase } from "../../utils/stringUtils";

export const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { category, loading: categoryLoading } = useCategory(
    categoryName || ""
  );
  const {
    categoryPosts,
    loading: postsLoading,
    refetch,
  } = useCategoryPosts(categoryName || "");
  const { isAuthenticated, user } = useAuth();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName) return;

    setSubmitting(true);
    try {
      await createPost(categoryName, {
        title: formData.title,
        content: formData.content,
      });
      setFormData({ title: "", content: "" });
      setShowCreateForm(false);
      refetch();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    setDeletingPostId(postId);
    try {
      await deletePost(postId);
      refetch();
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({ ...prev, title }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  if (categoryLoading || postsLoading) {
    return <Loading text="카테고리를 불러오는 중..." />;
  }

  if (!category) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            카테고리를 찾을 수 없습니다
          </h2>
          <p className="text-text-secondary">
            요청하신 카테고리가 존재하지 않습니다.
          </p>
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
              {kebabToTitleCase(category.name)}
            </h1>
            <p className="text-text-secondary mb-4">{category.description}</p>
          </div>
          {isAuthenticated && (
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              variant="primary"
            >
              {showCreateForm ? "취소" : "새 게시글 작성"}
            </Button>
          )}
        </div>
      </div>

      {showCreateForm && (
        <PostForm
          title={formData.title}
          content={formData.content}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowCreateForm(false)}
          submitting={submitting}
          submitText="게시글 작성"
        />
      )}

      <div className="space-y-4">
        {categoryPosts?.posts?.map((post) => (
          <Card
            key={post.id}
            className={`hover:shadow-md transition-shadow ${isAuthenticated && user?.username === post.authorName ? 'border-2 border-accent-primary' : ''}`}
          >
            <div className="flex items-start justify-between">
              <Link to={`/category/${categoryName}/${post.id}`} className="flex-1">
                <div className="card-header">
                  <h3 className="card-title text-lg">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>작성자: {post.authorName}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-text-secondary line-clamp-3">
                  {post.content.length > 200
                    ? `${post.content.substring(0, 200)}...`
                    : post.content}
                </div>
              </Link>
              {isAuthenticated && user?.username === post.authorName && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletePost(post.id);
                  }}
                  loading={deletingPostId === post.id}
                  className="ml-4 flex-shrink-0"
                >
                  삭제
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {categoryPosts?.posts?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            게시글이 없습니다
          </h3>
          <p className="text-text-secondary">
            {isAuthenticated
              ? "이 카테고리의 첫 번째 게시글을 작성해보세요!"
              : "이 카테고리에 게시글이 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
};
