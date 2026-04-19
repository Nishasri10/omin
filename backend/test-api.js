import axios from 'axios';

async function testAPI() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('Health check:', health.data);
    
    // Test signup
    const signup = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('Signup success:', signup.data);
    
    // Test login
    const login = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@retailpos.com',
      password: 'admin123'
    });
    console.log('Login success:', login.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();