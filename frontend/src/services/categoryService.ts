import api from "./api";
import type { CreatePostRequest, PostResponse } from "./postService";

export interface Category {
  name: string;
  description: string;
}

export interface CategoriesResponse {
  categories: CategoryResponse[];
}

export interface CategoryPostsResponse extends CategoryResponse {
  posts: PostResponse[];
}

export interface CategoryResponse {
  name: string;
  description: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get("/category");
  return response.data;
};

export const getCategory = async (name: string): Promise<CategoryResponse> => {
  const response = await api.get(`/category/${name}`);
  return response.data;
};

export const createCategory = async (
  request: CreateCategoryRequest
): Promise<CategoryResponse> => {
  const response = await api.post("/category", request);
  return response.data;
};

export const updateCategory = async (
  name: string,
  request: UpdateCategoryRequest
): Promise<CategoryResponse> => {
  const response = await api.put(`/category/${name}`, request);
  return response.data;
};

export const deleteCategory = async (name: string): Promise<void> => {
  await api.delete(`/category/${name}`);
};

export const getCategoryPosts = async (
  name: string
): Promise<CategoryPostsResponse> => {
  const response = await api.get(`/category/${name}/posts`);
  return response.data;
};

export const createPost = async (
  request: CreatePostRequest
): Promise<PostResponse> => {
  const response = await api.post("/posts", request);
  return response.data;
};
