import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Loading } from "../../components/common/Loading";
import { Textarea } from "../../components/common/Textarea";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (categoryLoading || postsLoading) {
    return <Loading text="Loading category..." />;
  }

  if (!category) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Category Not Found
          </h2>
          <p className="text-text-secondary">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {kebabToTitleCase(category.name)}
        </h1>
        <p className="text-text-secondary mb-4">{category.description}</p>

        {isAuthenticated && (
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant="primary"
          >
            {showCreateForm ? "Cancel" : "Create New Post"}
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
            />

            <Textarea
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Write your post content..."
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                loading={submitting}
                disabled={!formData.title || !formData.content}
              >
                Create Post
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {categoryPosts?.posts?.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <Link
                to={`/category/${categoryName}/${post.id}`}
                className="flex-1"
              >
                <div className="card-header">
                  <h3 className="card-title text-lg">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>By {post.authorName}</span>
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
                  Delete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {categoryPosts?.posts?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No Posts
          </h3>
          <p className="text-text-secondary">
            {isAuthenticated
              ? "Be the first to create a post in this category!"
              : "No posts available in this category."}
          </p>
        </div>
      )}
    </div>
  );
};
