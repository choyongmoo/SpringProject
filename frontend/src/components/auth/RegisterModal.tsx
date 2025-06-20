import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Modal } from "../common/Modal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      onClose();
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      // Error is handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "confirmPassword" && passwordError) {
      setPasswordError("");
    }
  };

  const handleSwitchToLogin = () => {
    onClose();
    onSwitchToLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
          placeholder="Choose a username"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Create a password"
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={passwordError}
          required
          placeholder="Confirm your password"
        />

        {(error || passwordError) && (
          <div className="error text-center text-sm bg-bg-tertiary border border-accent-danger rounded-md p-3">
            {passwordError || error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-border-color">
        <p className="text-text-secondary text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </Modal>
  );
};
