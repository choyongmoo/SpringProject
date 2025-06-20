import api from "./api";

export interface User {
  username: string;
  email: string;
  profileImageUrl: string;
  createdAt: Date;
}

export interface UpdateUserRequest {
  email: string;
}

export interface UserResponse {
  username: string;
  email: string;
  profileImageUrl: string;
  createdAt: Date;
}

export const getUser = async (name: string): Promise<UserResponse> => {
  const response = await api.get(`/user/${name}`);
  return response.data;
};

export const updateUser = async (
  name: string,
  request: UpdateUserRequest
): Promise<UserResponse> => {
  const response = await api.put(`/user/${name}`, request);
  return response.data;
};

export const deleteUser = async (name: string): Promise<void> => {
  await api.delete(`/user/${name}`);
};
