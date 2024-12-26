import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/user/auth/signup.css';
import logo from '../../../assets/images/logo.jpg';

// Define courses array outside the component
const courses = [
  "BS Information Technology",
  "BS Computer Science",
  "BS Information Systems",
  "BS Computer Engineering",
  "BS Electronics Engineering",
  "BS Electrical Engineering",
  "BS Civil Engineering",
  "BS Mechanical Engineering",
  "BS Industrial Engineering",
  "BS Chemical Engineering",
  "BS Criminology",
  "BS Nursing",
  // Add more courses as needed
].sort();

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    studentNo: '',
    course: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Check terms acceptance first
    if (!formData.termsAccepted) {
      setError('Please accept the Terms & Conditions to create an account');
      return;
    }
  
    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      // Add your signup logic here
      console.log('Form submitted:', formData);
      // You would typically make an API call here
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', err);
    }
  };
  
  // Helper function for email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-box">
        <div className="signup-logo">
          <img 
            src={logo} 
            alt="EduQuest Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-logo.png';
            }}
          />
          <h2 className="signup-logo-text">EduQuest</h2>
        </div>
        
        <div className="signup-header">
          <h3 className="page-title">SIGN UP</h3>
        </div>
        
        {error && <div className="signup-error-message">{error}</div>}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group fullname">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              id="studentNo"
              placeholder="Student No."
              value={formData.studentNo}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData(prevData => ({
                  ...prevData,
                  studentNo: value
                }));
              }}
              required
              min="0"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <div className="input-group">
            <select
              id="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="course-select"
            >
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input
              type="date"
              id="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group password-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group confirm-password-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms-checkbox">
            <label>
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </label>
          </div>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;