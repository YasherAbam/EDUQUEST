import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/user/auth/terms.css';

function Terms() {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowAcceptModal(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1500);
  };
  
  const handleDecline = () => {
    setShowDeclineModal(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="terms-container">
      <div className="terms-form-box">
        <div className="logo">
          <img src={logo} alt="EduQuest Logo" />
          <h2>EduQuest</h2>
        </div>
        
        <h3>Terms and Conditions</h3>
        
        <div className="terms-content">
          <div className="section">
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using EduQuest, you agree to be bound by these Terms and Conditions.</p>
            <ul>
              <li>You must be at least 18 years old to use this service</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>
          </div>

          <div className="section">
            <h4>2. User Responsibilities</h4>
            <p>As a user of EduQuest, you agree to:</p>
            <ul>
              <li>Use the platform for educational purposes only</li>
              <li>Respect intellectual property rights</li>
              <li>Not share account credentials with others</li>
              <li>Follow academic integrity guidelines</li>
            </ul>
          </div>

          <div className="section">
            <h4>3. Privacy Policy</h4>
            <p>We are committed to protecting your privacy:</p>
            <ul>
              <li>Personal information is collected and stored securely</li>
              <li>Data is used only for educational purposes</li>
              <li>We do not share information with third parties</li>
            </ul>
          </div>

          <div className="section">
            <h4>4. Content Usage</h4>
            <p>Regarding content on EduQuest:</p>
            <ul>
              <li>All materials are for educational use only</li>
              <li>Do not distribute or copy content without permission</li>
              <li>Respect copyright and intellectual property laws</li>
            </ul>
          </div>
        </div>

        <div className="buttons">
          <Button className="accept-btn" onClick={handleAccept}>
            Accept
          </Button>
          <Button className="decline-btn" onClick={handleDecline}>
            Decline
          </Button>
        </div>
      </div>

      {/* Accept Modal */}
      <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions Accepted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Terms & Conditions accepted successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Decline Modal */}
      <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions Declined</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must accept the Terms & Conditions to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeclineModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Terms;