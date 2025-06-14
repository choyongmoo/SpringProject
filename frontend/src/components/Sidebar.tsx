import { useState } from "react";
import Brand from "./common/Brand";
import Button from "./common/Button";
import Intro from "./common/Intro";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";

export default function Sidebar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <div className="basis-72 min-h-screen bg-background text-white p-6">
        <div className="mb-8 space-y-2">
          <Brand />
          <Intro />
        </div>

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