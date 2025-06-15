import api from './api';

export interface CreatePostRequest {
    title: string;
    content: string;
    categoryName: string;
}

export interface CreateCommentRequest {
    content: string;
}

export interface PostResponse {
    id: number;
    title: string;
    content: string;
    authorName: string;
    createdAt: string;
}

export interface CommentResponse {
    id: number;
    content: string;
    authorName: string;
    createdAt: string;
}

export interface PostsResponse {
    posts: PostResponse[];
}

export interface CommentsResponse {
    comments: CommentResponse[];
}

export const postService = {
    getAllPosts: async (): Promise<PostsResponse> => {
        const response = await api.get<PostsResponse>('/posts');
        return response.data;
    },

    getPost: async (id: number): Promise<PostResponse> => {
        const response = await api.get<PostResponse>(`/posts/${id}`);
        return response.data;
    },

    createPost: async (data: CreatePostRequest): Promise<PostResponse> => {
        const response = await api.post<PostResponse>('/posts', data);
        return response.data;
    },

    getComments: async (id: number): Promise<CommentsResponse> => {
        const response = await api.get<CommentsResponse>(`/posts/${id}/comments`);
        return response.data;
    },

    createComment: async (postId: number, data: CreateCommentRequest): Promise<void> => {
        await api.post(`/posts/${postId}/comments`, data);
    },
}; 