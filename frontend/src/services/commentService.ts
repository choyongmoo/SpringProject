import api from "./api";

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: Date;
}

export interface CommentResponse {
  id: number;
  content: string;
  authorName: string;
  createdAt: Date;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export const getComment = async (id: number): Promise<CommentResponse> => {
  const response = await api.get(`/comment/${id}`);
  return response.data;
};

export const updateComment = async (
  id: number,
  request: UpdateCommentRequest
): Promise<CommentResponse> => {
  const response = await api.put(`/comment/${id}`, request);
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comment/${id}`);
};
