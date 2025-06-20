import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import { Button } from "./common/Button";

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="bg-bg-secondary border-b border-border-color">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-bold text-text-primary hover:text-accent-primary transition-colors"
            >
              Final Forum
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                홈
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-text-secondary">
                    안녕하세요, {user?.username}님
                  </span>
                  <Button variant="secondary" size="sm" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    로그인
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    회원가입
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};
