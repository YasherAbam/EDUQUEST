import React from 'react';
import './offcampus.css';

const OffCampusModal = ({ isOpen, onClose, title, offcampusData }) => {
    if (!isOpen) return null;

    const requestLetters = Array.isArray(offcampusData.requestLetters) ? offcampusData.requestLetters : [];
    const compliance = Array.isArray(offcampusData.compliance) ? offcampusData.compliance : [];

    return (
        <div className="offcampus-modal-overlay">
            <div className="offcampus-modal-content">
                <div className="offcampus-modal-header">
                    <h4>{title}</h4>
                    <button className="offcampus-close-button" onClick={onClose}>×</button>
                </div>
                <div className="offcampus-modal-body">
                    <div className="offcampus-modal-columns">
                        {/* Request Letter Column */}
                        <div className="offcampus-modal-column">
                            <h4>Request Letter</h4>
                            {requestLetters.map((request, index) => (
                                <div key={index} className="department-item">
                                    <div className="department-info">
                                        <div className="department-icon">
                                            <i className="fas fa-globe"></i>
                                        </div>
                                        <span>{request.department}</span>
                                    </div>
                                    <span className="date-info">{request.date}</span>
                                    <span className={`status-badge status-${request.status.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Compliance Column */}
                        <div className="offcampus-modal-column">
                            <h4>Compliance of Requirements</h4>
                            {compliance.map((complianceItem, index) => (
                                <div key={index} className="department-item">
                                    <div className="department-info">
                                        <div className="department-icon">
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                        <span>{complianceItem.department}</span>
                                    </div>
                                    <span className="date-info">{complianceItem.date}</span>
                                    <span className={`status-badge status-${complianceItem.status.toLowerCase()}`}>
                                        {complianceItem.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffCampusModal;