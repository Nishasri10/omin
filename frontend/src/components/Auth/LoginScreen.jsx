import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('posToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userName', user.name);
      
      onLogin(user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 p-4">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm p-4 mb-4">
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-white/70">Sign in to your account</p>
        </div>
        
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@retailpos.com"
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-white/50" /> : <Eye className="h-5 w-5 text-white/50" />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Demo Credentials: <span className="text-white">admin@retailpos.com</span> / <span className="text-white">admin123</span>
            </p>
          </div>
          
          <p className="mt-6 text-center text-sm text-white/70">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-white hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;