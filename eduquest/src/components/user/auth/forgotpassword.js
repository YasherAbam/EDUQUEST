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
    const [isLoading, setIsLoading] = useState(false);
    const [showSavedInfo, setShowSavedInfo] = useState(false);
    
    // Initialize email state with remembered email if it exists
    const [email, setEmail] = useState(() => {
        return localStorage.getItem('rememberedEmail') || '';
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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

            // Save email to localStorage when it exists in the system
            localStorage.setItem('rememberedEmail', email);
            
            setShowSuccessModal(true);
            
            // Navigate after showing success modal
            setTimeout(() => {
                const token = btoa(email);
                navigate(`/reset-password?token=${token}`);
            }, 2000);
            
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

        const checkEmailExistsActive = async (email) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For testing purposes - add your test emails here
            const registeredEmails = [
                'test@example.com',
                'user@example.com',
                'admin@eduquest.com'
            ];
            
            return { exists: registeredEmails.includes(email.toLowerCase()) };
        } catch (error) {
            console.error('Error checking email:', error);
            throw error;
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate('/reset-password'); 
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <div className="forgot-container">
            <div className="forgot-form-box">
                <div className="forgot-header">
                    <div className="forgot-logo-container">
                        <img 
                            src={logo} 
                            alt="EduQuest Logo" 
                            className="forgot-logo-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'fallback-logo.png';
                            }}
                        />
                    </div>
                    <h1 className="forgot-title">EduQuest</h1>
                    <h2 className="forgot-page-title">Forgot Password</h2>
                </div>

                {errorMessage && !showErrorModal && (
                    <div className="forgot-error" role="alert">
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="forgot-form">
                    <div className="forgot-input-group">
                        <label className="visually-hidden" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            aria-required="true"
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="forgot-submit-btn" 
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <span>
                                <span className="forgot-loading-spinner"></span>
                                Sending...
                            </span>
                        ) : (
                            <span>SEND RESET LINK</span>
                        )}
                    </button>

                    <div className="forgot-footer">
                        <p>
                            Remember your password?{' '}
                            <Link 
                                to="/login" 
                                tabIndex={isLoading ? -1 : 0}
                            >
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </form>

              {/* Success Modal */}
<Modal 
    show={showSuccessModal} 
    onHide={handleSuccessModalClose}
    centered
    className="forgot-modal success"
    backdrop="static"
    keyboard={false}
>
    <Modal.Body>
        <div className="status-icon success">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <h5 className="modal-title">Check your email</h5>
        <p className="modal-message">We've sent you instructions to reset your password</p>
        <Button 
            className="btn-action"
            onClick={handleSuccessModalClose}
        >
            Check Email
        </Button>
    </Modal.Body>
</Modal>

{/* Error Modal */}
<Modal 
    show={showErrorModal} 
    onHide={handleErrorModalClose}
    centered
    className="forgot-modal error"
>
    <Modal.Body>
        <div className="status-icon error">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeLinecap="round"/>
            </svg>
        </div>
        <h5 className="modal-title">Unable to send link</h5>
        <p className="modal-message">{errorMessage}</p>
        <Button 
            className="btn-action"
            onClick={handleErrorModalClose}
        >
            Try Again
        </Button>
    </Modal.Body>
</Modal>

            </div>
        </div>
    );
}

export default ForgotPassword;