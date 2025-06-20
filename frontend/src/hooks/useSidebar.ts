import { useState } from "react";
import { useAuthStore } from "../stores";

export function useSidebar() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const { user, isAuthenticated, signout } = useAuthStore();

    return {
        isSignInOpen,
        setIsSignInOpen,
        isSignUpOpen,
        setIsSignUpOpen,
        user,
        isAuthenticated,
        signout,
    };
} 