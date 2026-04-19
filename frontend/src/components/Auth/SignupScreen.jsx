import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignupScreen = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api';

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Attempting to connect to:', `${API_URL}/auth/register`);
      
      const response = await axios.post(`${API_URL}/auth/register`, { 
        name, 
        email, 
        password 
      });
      
      console.log('Signup successful:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('posToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userName', user.name);
      
      if (onLogin) {
        onLogin(user);
      }
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Signup error details:', error);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Please make sure backend is running on port 5000');
        console.error('Network error - backend may not be running');
      } else if (error.response) {
        toast.error(error.response.data?.message || 'Registration failed');
      } else {
        toast.error('Registration failed. Please try again.');
      }
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
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-white/70">Join RetailPOS today</p>
        </div>
        
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
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
                  placeholder="Min 6 characters"
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
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="rounded border-white/20 bg-white/10"
              />
              <label htmlFor="showPassword" className="text-sm text-white/70">
                Show passwords
              </label>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-white/50">Demo accounts:</p>
            <p className="text-xs text-white/50">admin@retailpos.com / admin123</p>
          </div>
          
          <p className="mt-6 text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;