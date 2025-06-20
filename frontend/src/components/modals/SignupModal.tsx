import ModalLayout from "./ModalLayout";
import Button from "../common/Button";
import Input from "../common/Input";
import { useSignupModal } from "../../hooks/useSignupModal";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    handleSubmit,
  } = useSignupModal(onClose);

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sign Up">
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
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="flex gap-4 mt-8 mb-4">
          <Button variant="secondary" type="button" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
} 