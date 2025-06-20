import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../services/userService";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token: string, user: User) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth",
    }
  )
);

export const isAuthenticated = () => {
  const { token } = useAuthStore.getState();
  return !!token;
};
