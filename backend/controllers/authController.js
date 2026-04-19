import jwt from 'jsonwebtoken';

const users = new Map();

users.set('admin@retailpos.com', {
  id: '1',
  name: 'Admin User',
  email: 'admin@retailpos.com',
  password: 'admin123',
  role: 'admin',
  createdAt: new Date().toISOString()
});

users.set('demo@retailpos.com', {
  id: '2',
  name: 'Demo User',
  email: 'demo@retailpos.com',
  password: 'demo123',
  role: 'user',
  createdAt: new Date().toISOString()
});

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = users.get(email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    'secret-key',
    { expiresIn: '7d' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  
  if (users.has(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = {
    id: String(users.size + 1),
    name,
    email,
    password,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.set(email, newUser);
  
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    'secret-key',
    { expiresIn: '7d' }
  );
  
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
};

export const getMe = async (req, res) => {
  const user = users.get(req.user.email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
};