import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/logo.jpg';
import '../../../styles/user/auth/resetpassword.css';

function ResetPassword() {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);  // Add this
    const [formData, setFormData] = useState({
      newPassword: '',
      confirmPassword: ''
    });
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  };

  // Check if all password requirements are met
  const isPasswordValid = (password) => {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    if (!isPasswordValid(formData.newPassword)) {
      setMessage({ text: 'Please meet all password requirements', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccessModal(true);  // Replace setMessage with this
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setMessage({ text: 'Failed to reset password', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Update password validation on input change
  useEffect(() => {
    validatePassword(formData.newPassword);
  }, [formData.newPassword]);

  return (
    <div className="resetpassword-container">
      <div className="resetpassword-form-box">
        <div className="logo">
          <img src={logo} alt="EduQuest Logo" />
          <h2>EduQuest</h2>
        </div>
        
        <h3>Reset Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="instruction">
            <p>Create a new password for your account.</p>
          </div>

          <div className="input-group">
                <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    placeholder="New Password"
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm Password"
                    required
                />
                <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Password Reset Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Your password has been reset successfully.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                Close
                </Button>
                </Modal.Footer>
                 </Modal>
            </div>

          <div className="password-requirements">
            <p>Password must contain:</p>
            <ul>
              <li className={passwordRequirements.length ? 'valid' : ''}>
                At least 8 characters
              </li>
              <li className={passwordRequirements.uppercase ? 'valid' : ''}>
                One uppercase letter
              </li>
              <li className={passwordRequirements.lowercase ? 'valid' : ''}>
                One lowercase letter
              </li>
              <li className={passwordRequirements.number ? 'valid' : ''}>
                One number
              </li>
              <li className={passwordRequirements.special ? 'valid' : ''}>
                One special character
              </li>
            </ul>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="form-footer">
          <p>Remember your password? <Link to="/login">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;