import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/user/dashboard/userdashboard.css';
import logo from '../../../assets/images/uz.png';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const [profileData, setProfileData] = useState({
        fullName: 'Student Name',
        studentId: 'STU123456',
        email: 'student@eduquest.com',
        phoneNumber: '+123456789',
        department: 'Computer Science',
        password: '********'
    });

    useEffect(() => {
        // Mock user data
        const mockUserData = {
            name: "Student",
            profileImage: null
        };
        setUserName(mockUserData.name);
        setProfileImage(mockUserData.profileImage);

        // Mock notifications
        const mockNotifications = [
            { id: 1, message: "New requirement added", read: false },
            { id: 2, message: "Application status updated", read: true }
        ];
        setNotifications(mockNotifications);
        setNotificationCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    const handleProfileButtonClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <div className="user-dashboard">
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
                <div 
                    className={`notification-icon-container ${isNotificationModalOpen ? 'active' : ''}`}
                    onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
                >
                    <i className="fas fa-bell"></i>
                    {notificationCount > 0 && (
                        <span className="notification-count has-notifications">
                            {notificationCount}
                        </span>
                    )}
                </div>
                <span id="userName">Welcome, {userName}!</span>
                <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {profileImage ? (
                        <img src={profileImage} alt="User Profile" />
                    ) : (
                        <i className="fas fa-user-circle"></i>
                    )}
                </div>
                <ul className={`user-dropdown-content ${isDropdownOpen ? 'active' : ''}`}>
                    <li>
                        <button onClick={handleProfileButtonClick} className="profile-button">
                            <i className="fas fa-user-cog"></i>
                            Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </header>

            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <nav>
                    <div className="sidebar-category">Main Navigation</div>
                    <ul>
                        <li>
                            <Link to="/user-dashboard" className="active">
                                <i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/internship-application">
                                <i className="fas fa-briefcase"></i>
                                <span>Internship Application</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/requirements">
                                <i className="fas fa-file-alt"></i>
                                <span>Requirements</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/progress">
                                <i className="fas fa-chart-line"></i>
                                <span>Progress</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-category">Settings</div>
                    <ul>
                        <li>
                            <Link to="/user-settings">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-help">
                                <i className="fas fa-question-circle"></i>
                                <span>Help</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-profile">
                        <div className="profile-image">
                            {profileImage ? (
                                <img src={profileImage} alt="User Profile" />
                            ) : (
                                <i className="fas fa-user-circle"></i>
                            )}
                        </div>
                        <div className="profile-info">
                            <h3>{userName}</h3>
                            <p>student@eduquest.com</p>
                        </div>
                    </div>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Dashboard</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3><i className="fas fa-briefcase"></i> Internship Status</h3>
                        <p>Application Status: Pending</p>
                        <p>Hours Completed: 0/500</p>
                        <Link to="/internship-details" className="view-all">
                            View Details <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-file-alt"></i> Requirements</h3>
                        <p>Pending Requirements: 3</p>
                        <p>Submitted Documents: 2</p>
                        <Link to="/requirements" className="view-all">
                            View Requirements <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <h3><i className="fas fa-chart-line"></i> Progress</h3>
                        <p>Current Progress: 0%</p>
                        <p>Remaining Hours: 500</p>
                        <Link to="/progress" className="view-all">
                            View Progress <i className="fas fa-arrow-right"></i>
                        </Link>
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

export default UserDashboard;