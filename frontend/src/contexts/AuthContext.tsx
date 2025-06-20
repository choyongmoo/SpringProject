import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { SigninRequest, SignupRequest, UserResponse } from '../services/authService';

interface AuthContextType {
    user: UserResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signin: (data: SigninRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error);
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const signin = async (data: SigninRequest) => {
        const response = await authService.signin(data);
        localStorage.setItem('token', response.token);
        const userData = await authService.getCurrentUser();
        setUser(userData);
    };

    const signup = async (data: SignupRequest) => {
        const response = await authService.signup(data);
        localStorage.setItem('token', response.token);
        const userData = await authService.getCurrentUser();
        setUser(userData);
    };

    const signout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        signin,
        signup,
        signout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 