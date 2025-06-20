import { useCallback, useEffect, useState } from "react";
import type {
  CategoryPostsResponse,
  CategoryResponse,
} from "../services/categoryService";
import {
  getCategories,
  getCategory,
  getCategoryPosts,
} from "../services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCategories();
      setCategories(response.categories);
    } catch {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export const useCategory = (name: string) => {
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getCategory(name);
      setCategory(response);
    } catch {
      setError("Failed to fetch category");
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    loading,
    error,
    refetch: fetchCategory,
  };
};

export const useCategoryPosts = (name: string) => {
  const [categoryPosts, setCategoryPosts] =
    useState<CategoryPostsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryPosts = useCallback(async () => {
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getCategoryPosts(name);
      setCategoryPosts(response);
    } catch {
      setError("Failed to fetch category posts");
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchCategoryPosts();
  }, [fetchCategoryPosts]);

  return {
    categoryPosts,
    loading,
    error,
    refetch: fetchCategoryPosts,
  };
};
