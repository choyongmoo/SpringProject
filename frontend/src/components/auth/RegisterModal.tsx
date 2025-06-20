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
      setPasswordError("비밀번호가 일치하지 않습니다");
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
    <Modal isOpen={isOpen} onClose={onClose} title="회원가입" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="사용자명"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
          placeholder="사용자명을 선택하세요"
        />

        <Input
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="이메일을 입력하세요"
        />

        <Input
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="비밀번호를 생성하세요"
        />

        <Input
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={passwordError}
          required
          placeholder="비밀번호를 확인하세요"
        />

        {(error || passwordError) && (
          <div className="error text-center text-sm bg-bg-tertiary border border-accent-danger rounded-md p-3">
            {passwordError || error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          계정 만들기
        </Button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-border-color">
        <p className="text-text-secondary text-sm">
          이미 계정이 있으신가요?{" "}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            로그인
          </button>
        </p>
      </div>
    </Modal>
  );
};
