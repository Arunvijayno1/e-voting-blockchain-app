import React, { useState } from 'react';
import { registerUser, loginUser } from '../api.js';

export default function AuthModal({ role = 'voter', isLogin = true, setIsLogin, onClose, onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const user = await loginUser(email, password);
        onAuthSuccess(user.role || role);
      } else {
        const user = await registerUser(email, password, role);
        onAuthSuccess(user.role || role);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-scale-in text-white" role="dialog" aria-modal="true">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">✕</button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{isLogin ? `${capitalize(role)} Login` : `${capitalize(role)} Registration`}</h2>
          <p className="text-gray-300 mt-2">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Create an account to get started.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" required className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400" />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300 shadow-lg hover:shadow-primary/50">
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-white hover:underline ml-1">
            {isLogin ? 'Register Now' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
