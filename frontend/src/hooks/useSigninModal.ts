import { useState } from "react";
import { useAuthStore } from "../stores";

export function useSigninModal(onClose: () => void) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signin } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signin({ username, password });
            onClose();
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit,
    };
} 