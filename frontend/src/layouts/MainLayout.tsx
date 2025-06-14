import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SigninModal from "../components/modals/SigninModal";
import SignupModal from "../components/modals/SignupModal";

export default function MainLayout() {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d131e]">
      <Sidebar
        onSignin={() => setShowSignin(true)}
        onSignup={() => setShowSignup(true)}
      />
      <div className="ml-64 min-h-screen flex flex-col">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Modals */}
      {showSignin && (
        <SigninModal
          onClose={() => setShowSignin(false)}
          onSignup={() => {
            setShowSignin(false);
            setShowSignup(true);
          }}
        />
      )}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}