import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/logo.jpg';
import '../../../styles/user/auth/forgotpassword.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Add email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Testing version
const checkEmailExistsTest = async (email) => {
    try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For testing - add your email to this array
        const registeredEmails = [
            'test@example.com',
            'user@example.com',
            // Add your email here for testing
            'youremail@example.com'
        ];
        
        return { exists: registeredEmails.includes(email.toLowerCase()) };
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
};

// Production version (commented out for now)
// eslint-disable-next-line no-unused-vars
const checkEmailExists = async (email) => {
    try {
        // Replace 'your-backend-url' with your actual backend URL
        const response = await fetch('your-backend-url/api/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return { exists: data.exists };
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
};

// Use the test version for now
const checkEmailExistsActive = checkEmailExistsTest;
// When ready for production, change to:
// const checkEmailExistsActive = checkEmailExists;

// Update the handleSubmit function to use checkEmailExistsActive
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isValidEmail(email)) {
        setErrorMessage('Please enter a valid email address');
        setShowErrorModal(true);
        setIsLoading(false);
        return;
    }

    try {
        const response = await checkEmailExistsActive(email);
                
                if (!response.exists) {
                    setErrorMessage('This email is not registered in our system');
                    setShowErrorModal(true);
                    setIsLoading(false);
                    return;
                }
    
                await new Promise(resolve => setTimeout(resolve, 1500));
                setShowSuccessModal(true);
    
                setTimeout(() => {
                    navigate('/reset-password');
                }, 2000);
                
            } catch (error) {
                setErrorMessage('An error occurred. Please try again later.');
                setShowErrorModal(true);
            } finally {
                setIsLoading(false);
            }
        };

  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-form-box">
        <div className="logo">
          <img src={logo} alt="EduQuest Logo" />
          <h2>EduQuest</h2>
        </div>
        
        <h3>Forgot Password</h3>
        <p className="instruction">Enter your email address to reset your password</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="form-footer">
          <p>Remember your password? <Link to="/login">Back to Login</Link></p>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Link Sent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Reset link has been sent to your email.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;