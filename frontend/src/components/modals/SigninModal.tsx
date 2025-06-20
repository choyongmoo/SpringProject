import { useState } from "react";
import ModalLayout from "./ModalLayout";
import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../../contexts/AuthContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signin } = useAuth();

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

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Input
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex gap-4 mt-8 mb-4">
          <Button variant="secondary" type="button" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" fullWidth>
            Sign In
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 