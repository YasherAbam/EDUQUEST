import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/admin/dashboard/admin2dashboard.css';
import logo from '../../../assets/images/uz.png';
import ProfileModal from '../../admin/profile/profilemodal';
import NotificationModal from '../../admin/notification/notificationmodal';

const Admin2Dashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    const [profileData] = useState({
        fullName: 'Admin 2',
        adminId: 'ADM223456',
        email: 'admin2@eduquest.com',
        phoneNumber: '+123456789',
        department: 'Administration',
        password: '********'
    });

    const handleProfileButtonClick = () => {
        setIsProfileModalOpen(true);
    };

    return (
        <div className="admin2-dashboard">
            {/* Header */}
            <header className="admin2-header">
                <div className="header-left">
                    <button 
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <img src={logo} alt="EduQuest Logo" className="header-logo" />
                    <h1>EduQuest</h1>
                </div>
                <div className="header-right">
                    <button 
                        className="notification-btn"
                        onClick={() => setIsNotificationModalOpen(true)}
                    >
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-badge">{notificationCount}</span>
                        )}
                    </button>
                    <div className="profile-section">
                        <button 
                            className="profile-btn"
                            onClick={handleProfileButtonClick}
                        >
                            <i className="fas fa-user-circle"></i>
                            <span>{profileData.fullName}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                {/* Sidebar */}
                <aside className={`admin2-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <nav className="sidebar-nav">
                        <Link to="/admin2/dashboard" className="nav-item active">
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/admin2/settings" className="nav-item">
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </Link>
                        <button 
                            className="nav-item logout-btn"
                            onClick={() => navigate('/login')}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="dashboard-header">
                        <h2>Welcome, {profileData.fullName}</h2>
                        <p>Manage and monitor student activities</p>
                    </div>

                    <div className="activity-grid">
                        <Link to="/admin2/internship" className="activity-card">
                            <div className="card-icon">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3>Internship</h3>
                            <p>Manage internship activities</p>
                        </Link>

                        <Link to="/admin2/inhouse" className="activity-card">
                            <div className="card-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <h3>In-House Activity</h3>
                            <p>Monitor in-house activities</p>
                        </Link>

                        <Link to="/admin2/offcampus" className="activity-card">
                            <div className="card-icon">
                                <i className="fas fa-external-link-alt"></i>
                            </div>
                            <h3>Off-Campus Activity</h3>
                            <p>Track off-campus activities</p>
                        </Link>
                    </div>
                </main>
            </div>

            {/* Modals */}
            <ProfileModal 
                show={isProfileModalOpen}
                onHide={() => setIsProfileModalOpen(false)}
                profileData={profileData}
            />

            <NotificationModal
                show={isNotificationModalOpen}
                onHide={() => setIsNotificationModalOpen(false)}
                notifications={[]}
            />
        </div>
    );
};

export default Admin2Dashboard;