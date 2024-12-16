import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/user/auth/login.css';
import logo from '../../../assets/images/logo.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    return {
      email: savedEmail || '',
      password: '',
      rememberMe: !!savedEmail
    };
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add these three lines right here
    console.log('Test login enabled:', process.env.REACT_APP_USE_TEST_LOGIN);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    setError('');
    setIsLoading(true);
  
    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
      }
  
      // Check if we're in development mode (for testing)
      if (process.env.REACT_APP_USE_TEST_LOGIN === 'true') {
      const testAdminEmail = 'admin@eduquest.com';
      const testUserEmail = 'user@eduquest.com';
      const testPassword = 'password123';
  
      if (formData.email === testAdminEmail && formData.password === testPassword) {
        sessionStorage.setItem('adminToken', 'demo-admin-token');
        navigate('/admin-dashboard');
        return;
      } else if (formData.email === testUserEmail && formData.password === testPassword) {
        sessionStorage.setItem('userToken', 'demo-user-token');
        handleRememberMe();
        navigate('/user-dashboard');
        return;
      }
      setError('Invalid email or password');
      return;
    }
  
      // Real backend implementation
    try {
      const adminResponse = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        sessionStorage.setItem('adminToken', adminData.token);
        navigate('/admin/dashboard');
        return;
      }

      const userResponse = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        sessionStorage.setItem('userToken', userData.token);
        handleRememberMe();
        navigate('/dashboard');
      } else {
        const errorData = await userResponse.json();
        setError(errorData.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error. Please try again later.');
    }

  } catch (err) {
    setError('Login failed. Please check your credentials and try again.');
    console.error('Login error:', err);
  } finally {
    setIsLoading(false);
  }
};
  
  // Helper function for remember me functionality
  const handleRememberMe = () => {
    if (formData.rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  

  return (
    <div className="login-container">
        <div className="login-form-box">
          <div className="logo">
            <img src={logo} alt="EduQuest Logo" />
            <h2 className="logo-text">EduQuest</h2>
          </div>
          
          <h3>LOGIN</h3>
          
          {error && <div className="error-message">{error}</div>}
          
            <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="visually-hidden">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
  );
}

export default Login;