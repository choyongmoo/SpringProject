import api from './api';

export interface SignupRequest {
    username: string;
    password: string;
    email: string;
}

export interface SigninRequest {
    username: string;
    password: string;
}

export interface SigninResponse {
    token: string;
}

export interface UserResponse {
    username: string;
    email: string;
    createdAt: string;
}

export const authService = {
    signup: async (data: SignupRequest): Promise<SigninResponse> => {
        const response = await api.post<SigninResponse>('/auth/signup', data);
        return response.data;
    },

    signin: async (data: SigninRequest): Promise<SigninResponse> => {
        const response = await api.post<SigninResponse>('/auth/signin', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        const response = await api.get<UserResponse>('/auth/me');
        return response.data;
    },
}; 