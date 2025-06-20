import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Modal } from "../common/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      onClose();
      setFormData({ username: "", password: "" });
    } catch {
      // Error is handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwitchToRegister = () => {
    onClose();
    onSwitchToRegister();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
          placeholder="Enter your username"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        {error && (
          <div className="error text-center text-sm bg-bg-tertiary border border-accent-danger rounded-md p-3">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-border-color">
        <p className="text-text-secondary text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToRegister}
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </Modal>
  );
};
