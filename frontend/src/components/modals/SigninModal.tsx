import { useState } from 'react';
import ModalLayout from './ModalLayout';
import { authService } from '../../services/authService';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

export default function SignInModal({ isOpen, onClose, onSignUpClick }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.signIn({ email, password });
      onClose();
      // Optionally refresh the page or update the UI state
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            Don't have an account? Sign up
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </ModalLayout>
  );
}