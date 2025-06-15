import api from './api';
import type { PostsResponse } from './postService';

export interface CreateCategoryRequest {
    name: string;
    description: string;
}

export interface CategoryResponse {
    name: string;
    description: string;
}

export interface CategoriesResponse {
    categories: CategoryResponse[];
}

export const categoryService = {
    getAllCategories: async (): Promise<CategoriesResponse> => {
        const response = await api.get<CategoriesResponse>('/categories');
        return response.data;
    },

    getCategory: async (name: string): Promise<CategoryResponse> => {
        const response = await api.get<CategoryResponse>(`/categories/${name}`);
        return response.data;
    },

    createCategory: async (data: CreateCategoryRequest): Promise<CategoryResponse> => {
        const response = await api.post<CategoryResponse>('/categories', data);
        return response.data;
    },

    getAllPosts: async (name: string): Promise<PostsResponse> => {
        const response = await api.get<PostsResponse>(`/categories/${name}/posts`);
        return response.data;
    },
};