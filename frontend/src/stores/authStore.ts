import { create } from 'zustand';
import { authService } from '../services/authService';
import type { SigninRequest, SignupRequest, UserResponse } from '../services/authService';

interface AuthState {
    user: UserResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signin: (data: SigninRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    signout: () => void;
    initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    initAuth: async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userData = await authService.getCurrentUser();
                set({ user: userData, isAuthenticated: true });
            }
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            localStorage.removeItem('token');
        } finally {
            set({ isLoading: false });
        }
    },

    signin: async (data: SigninRequest) => {
        const response = await authService.signin(data);
        localStorage.setItem('token', response.token);
        const userData = await authService.getCurrentUser();
        set({ user: userData, isAuthenticated: true });
    },

    signup: async (data: SignupRequest) => {
        const response = await authService.signup(data);
        localStorage.setItem('token', response.token);
        const userData = await authService.getCurrentUser();
        set({ user: userData, isAuthenticated: true });
    },

    signout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },
})); 