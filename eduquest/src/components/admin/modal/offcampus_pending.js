import React from 'react';
import './offcampus_pending.css';

const PendingOffCampusModal = ({ isOpen, onClose, title, pendingData }) => {
    if (!isOpen) return null;

    // Define pendingRequests here
    const pendingRequests = [
        {
            department: "SAM Department",
            activityName: "Off-Campus Activity 1",
            status: 2
        },
        {
            department: "SEICT Department",
            activityName: "Off-Campus Activity 2",
            status: 1
        },
        {
            department: "SBM Department",
            activityName: "Off-Campus Activity 3",
            status: 3
        },
        {
            department: "SCJ Department",
            activityName: "Off-Campus Activity 4",
            status: 4
        }
    ];

    return (
        <div className="pending-modal-overlay">
            <div className="pending-modal-content">
                <div className="pending-modal-header">
                    <h4>{title}</h4>
                    <button className="pending-close-button" onClick={onClose}>×</button>
                </div>
                <div className="pending-modal-body">
                    {pendingRequests.map((request, index) => (
                        <div key={index} className="pending-item">
                            <div className="department-info">
                                <div className="department-icon">
                                    <i className="fas fa-globe"></i>
                                </div>
                                <div className="department-details">
                                    <span className="department-name">{request.department}</span>
                                    <span className="activity-name">{request.activityName}</span>
                                </div>
                            </div>
                            
                            <div className="stepper-container">
                                <div className="stepper-track">
                                    <div className={`stepper-step ${request.status >= 1 ? 'completed' : ''}`}>
                                        <div className="step-icon">
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                        <span className="step-label">Submitted</span>
                                    </div>
                                    <div className={`stepper-step ${request.status >= 2 ? 'completed' : ''}`}>
                                        <div className="step-icon">
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <span className="step-label">Reviewed</span>
                                    </div>
                                    <div className={`stepper-step ${request.status >= 3 ? 'completed' : ''}`}>
                                        <div className="step-icon">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <span className="step-label">Approved</span>
                                    </div>
                                    <div className={`stepper-step ${request.status >= 4 ? 'completed' : ''}`}>
                                        <div className="step-icon">
                                            <i className="fas fa-flag"></i>
                                        </div>
                                        <span className="step-label">Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PendingOffCampusModal;