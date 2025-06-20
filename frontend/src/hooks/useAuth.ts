import { useState } from "react";
import { signin, signup } from "../services/authService";
import { useAuthStore } from "../stores/authStore";

interface SigninRequest {
  username: string;
  password: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAuth = () => {
  const { token, user, setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: SigninRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signin(credentials);
      setAuth(response.token, response.user);
      return response;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: SignupRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signup(userData);
      setAuth(response.token, response.user);
      return response;
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  return {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    register,
    logout,
  };
};
