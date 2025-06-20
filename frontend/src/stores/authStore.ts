import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../services/userService";

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  signout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string) => set({ token }),
      setUser: (user: User) => set({ user }),
      signout: () => set({ token: null, user: null }),
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
