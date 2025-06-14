import { Link } from 'react-router';
import Button from './common/Button';

export default function Sidebar({
  onSignin,
  onSignup,
}: {
  onSignin: () => void;
  onSignup: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900/90 bg-gradient-to-b from-green-900/20 to-gray-900 text-white p-6 flex flex-col">
      {/* Website Title and Description */}
      <div className="mb-8">
        <Link to="/" className="group">
          <h1 className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">Yuhan Forum</h1>
        </Link>
        <p className="mt-2 text-sm text-gray-400">
          Welcome to our platform. Discover amazing content and connect with others.
        </p>
      </div>

      <hr className="border-green-800/50 mb-8" />

      {/* Auth Buttons */}
      <div className="mb-8 space-y-4">
        <Button
          onClick={onSignin}
          variant="primary"
          fullWidth
        >
          Sign In
        </Button>
        <Button
          onClick={onSignup}
          variant="outline"
          fullWidth
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}