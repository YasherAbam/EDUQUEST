import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminaboutus.css';
import logo from '../../../assets/images/uz.png';

const AdminAboutUs = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    return (
        <div className="admin-dashboard">
            {/* Header - Same as AdminDashboard */}
            <header>
                <div className="burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <i className="fas fa-bars"></i>
                </div>
                <div className="logo">
                    <img src={logo} alt="EduQuest Logo" />
                    <h1>EduQuest</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="user-profile">
                    <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="notification-count has-notifications">
                                {notificationCount}
                            </span>
                        )}
                    </div>
                    <span id="userName">Welcome, {adminName}!</span>
                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {profileImage ? (
                            <img src={profileImage} alt="Admin Profile" />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                    <ul className={`admin-dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                        <li>
                            <Link to="/admin-profile">
                                <i className="fas fa-user-cog"></i>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout">
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Sidebar - Same as AdminDashboard */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/admin-dashboard">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-category">System</div>
                    <ul>
                        <li>
                            <Link to="/admin-aboutus" className="active">
                                <i className="fas fa-info-circle"></i>
                                <span>About Us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-FAQs">
                                <i className="fas fa-question-circle"></i>
                                <span>FAQs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-settings">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content - About Us specific */}
            <main className="main-content">
                <h2 className="page-title">About Us</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
                        <p>To streamline and enhance the management of internships and activities for students, providing a seamless experience for both administrators and participants.</p>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-eye"></i> Our Vision</h3>
                        <p>To be the leading platform for educational activity management, fostering growth and development in academic institutions.</p>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-tasks"></i> What We Do</h3>
                        <ul>
                            <li>Manage internship applications and placements</li>
                            <li>Coordinate in-house activities</li>
                            <li>Facilitate off-campus programs</li>
                            <li>Track student progress and compliance</li>
                            <li>Generate comprehensive reports</li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer>
                <p>&copy; 2024 EduQuest. All rights reserved.</p>
                <Link to="/help">Help</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>
        </div>
    );
};

export default AdminAboutUs;