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
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Check if we're in development mode (for testing)
      if (process.env.REACT_APP_USE_TEST_LOGIN === 'true') {
        const testAdminEmail = 'admin@eduquest.com';
        const testAdmin2Email = 'admin2@eduquest.com';
        const testUserEmail = 'user@eduquest.com';
        const testPassword = 'password123';

        if (formData.email === testAdminEmail && formData.password === testPassword) {
          sessionStorage.setItem('adminToken', 'demo-admin-token');
          handleRememberMe();
          navigate('/admin-dashboard');
          return;
        } else if (formData.email === testAdmin2Email && formData.password === testPassword) {
          sessionStorage.setItem('adminToken', 'demo-admin2-token');
          handleRememberMe();
          navigate('/admin2-dashboard');
          return;
        } else if (formData.email === testUserEmail && formData.password === testPassword) {
          sessionStorage.setItem('userToken', 'demo-user-token');
          handleRememberMe();
          navigate('/user-dashboard');
          return;
        }
        setError('Invalid email or password');
        setIsLoading(false);
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
          handleRememberMe();
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
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="login-header">
          <div className="logo-container">
            <img 
              src={logo} 
              alt="EduQuest Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'fallback-logo.png';
              }}
            />
          </div>
          <h1 className="app-title">EduQuest</h1>
          <h2 className="page-title">Login</h2>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div className="remember-forgot">
            <label className="remember-label">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <Link 
              to="/forgot-password" 
              className="forgot-link" 
              tabIndex={isLoading ? -1 : 0}
            >
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <span>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </span>
          </button>

          <div className="form-footer">
            <p>
              Don't have an account?
              <Link 
                to="/signup" 
                tabIndex={isLoading ? -1 : 0}
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;