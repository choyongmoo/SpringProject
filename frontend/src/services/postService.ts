import api from "./api";
import type { CommentResponse, CreateCommentRequest } from "./commentService";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryName: string;
}

export interface PostCommentsResponse extends PostResponse {
  comments: CommentResponse[];
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export const getPost = async (id: number): Promise<PostResponse> => {
  const response = await api.get(`/post/${id}`);
  return response.data;
};

export const updatePost = async (
  id: number,
  request: UpdatePostRequest
): Promise<PostResponse> => {
  const response = await api.put(`/post/${id}`, request);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/post/${id}`);
};

export const getPostComments = async (
  id: number
): Promise<PostCommentsResponse> => {
  const response = await api.get(`/post/${id}/comments`);
  return response.data;
};

export const createComment = async (
  id: number,
  request: CreateCommentRequest
): Promise<CommentResponse> => {
  const response = await api.post(`/post/${id}/comments`, request);
  return response.data;
};
