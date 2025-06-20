import Brand from "./common/Brand";
import Button from "./common/Button";
import Intro from "./common/Intro";
import SignInModal from "./modals/SigninModal";
import SignUpModal from "./modals/SignupModal";
import { useSidebar } from "../hooks/useSidebar";

export default function Sidebar() {
  const {
    isSignInOpen,
    setIsSignInOpen,
    isSignUpOpen,
    setIsSignUpOpen,
    user,
    isAuthenticated,
    signout,
  } = useSidebar();

  return (
    <>
      <div className="basis-72 min-h-screen bg-background text-white p-6">
        <div className="mb-8 space-y-2">
          <Brand />
          <Intro />
        </div>

        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="bg-background-dark p-4 rounded-lg space-y-2">
              <div className="text-sm text-gray-400">Username</div>
              <div className="font-medium">{user?.username}</div>

              <div className="text-sm text-gray-400 mt-3">Email</div>
              <div className="font-medium">{user?.email}</div>

              <div className="text-sm text-gray-400 mt-3">Member since</div>
              <div className="font-medium">
                {new Date(user?.createdAt || "").toLocaleDateString()}
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={signout}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              variant="primary"
              fullWidth
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsSignUpOpen(true)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
}