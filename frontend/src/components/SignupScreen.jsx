// SignupScreen.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register as registerRequest } from '../services/api.js';

const SignupScreen = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await registerRequest({ name, email, password });
      localStorage.setItem('posToken', result.data.token);
      onLogin(result.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_35%)] px-4 py-10">
      <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 rounded-3xl bg-slate-900 px-8 py-6 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Create account</h1>
          <p className="mt-2 text-slate-300">Register your store user and start managing products, orders, and sales.</p>
        </div>
        {error && <div className="mb-5 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="admin@example.com"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <div className="relative mt-3">
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Choose a password"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-slate-500 transition hover:text-slate-900"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    <path d="M17.94 17.94a10.44 10.44 0 0 0 2.06-2.57M2.77 2.77l18.46 18.46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5c4.97 0 9 3.58 10 8-1 4.42-5.03 8-10 8-1.69 0-3.29-.4-4.7-1.12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    <path d="M1.05 12C2.6 7.58 7.07 4 12 4c4.93 0 9.4 3.58 10.95 8-1.55 4.42-6.02 8-10.95 8-4.93 0-9.4-3.58-10.95-8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </label>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 transition hover:text-slate-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;