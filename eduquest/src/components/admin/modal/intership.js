import React, { useState } from 'react';
import './internship.css';

const Modal = ({ isOpen, onClose, title, internshipData }) => {
    const [expandedRequests, setExpandedRequests] = useState([]);
    const [expandedCompliance, setExpandedCompliance] = useState([]);

    if (!isOpen) return null;

    const requestLetters = Array.isArray(internshipData.requestLetters) ? internshipData.requestLetters : [];
    const compliance = Array.isArray(internshipData.compliance) ? internshipData.compliance : [];

    const toggleRequest = (index) => {
        setExpandedRequests(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const toggleCompliance = (index) => {
        setExpandedCompliance(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <div className="internship-modal-overlay">
            <div className="internship-modal-content">
                <div className="internship-modal-header">
                    <h4>{title}</h4>
                    <button className="internship-close-button" onClick={onClose}>×</button>
                </div>
                <div className="internship-modal-body">
                    <div className="internship-modal-columns">
                        {/* Request Letter Column */}
                        <div className="internship-modal-column">
                            <h4>Request Letter</h4>
                            {requestLetters.map((request, index) => (
                                <div key={index} className="internship-card">
                                    <div 
                                        onClick={() => toggleRequest(index)} 
                                        className="internship-card-header"
                                    >
                                        <strong>{request.department}</strong> submitted a request letter.
                                    </div>
                                    {expandedRequests.includes(index) && (
                                        <div className="internship-card-details">
                                            <p className={`internship-status-${request.status.toLowerCase()}`}>
                                                {request.status}
                                            </p>
                                            <p>Date: {request.date}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Compliance Column */}
                        <div className="internship-modal-column">
                            <h4>Compliance of Requirements</h4>
                            {compliance.map((complianceItem, index) => (
                                <div key={index} className="internship-card">
                                    <div 
                                        onClick={() => toggleCompliance(index)} 
                                        className="internship-card-header"
                                    >
                                        <strong>{complianceItem.department}</strong> submitted requirements.
                                    </div>
                                    {expandedCompliance.includes(index) && (
                                        <div className="internship-card-details">
                                            <p className={`internship-status-${complianceItem.status.toLowerCase()}`}>
                                                {complianceItem.status}
                                            </p>
                                            <p>Date: {complianceItem.date}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;