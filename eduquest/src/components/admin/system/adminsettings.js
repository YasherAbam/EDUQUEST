import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/admin/dashboard/admindashboard.css';
import '../../../styles/admin/system/adminsettings.css';
import logo from '../../../assets/images/uz.png';

const AdminSettings = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [adminName, setAdminName] = useState('Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    // Settings states
    const [settings, setSettings] = useState({
        emailNotifications: true,
        systemUpdates: true,
        activityAlerts: true,
        darkMode: false,
        language: 'english',
        timezone: 'UTC+8',
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
        
        // Handle dark mode toggle
        if (setting === 'darkMode') {
            document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
    }, []);

    const handleSaveSettings = () => {
        // Here you would typically save the settings to your backend
        console.log('Saving settings:', settings);
        // Add your save logic here
    };

    return (
        <div className="admin-dashboard">
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
                    <span>Welcome, {adminName}!</span>
                    <div className="profile-pic" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {profileImage ? (
                            <img src={profileImage} alt="Admin Profile" />
                        ) : (
                            <i className="fas fa-user-circle"></i>
                        )}
                    </div>
                </div>
            </header>

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
                            <Link to="/admin-aboutus">
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
                            <Link to="/admin-settings" className="active">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <h2 className="page-title">Settings</h2>
                
                <div className="settings-content">
                    <div className="settings-section">
                        <h3>Notifications</h3>
                        <div className="settings-group">
                            <div className="notification-setting">
                                <span>Email Notifications</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="notification-setting">
                                <span>System Updates</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.systemUpdates}
                                        onChange={(e) => handleSettingChange('systemUpdates', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="notification-setting">
                                <span>Activity Alerts</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.activityAlerts}
                                        onChange={(e) => handleSettingChange('activityAlerts', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>Preferences</h3>
                        <div className="settings-group">
                            <div className="notification-setting">
                                <span>Dark Mode</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.darkMode}
                                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <label>Language</label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleSettingChange('language', e.target.value)}
                            >
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                            </select>

                            <label>Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                            >
                                <option value="UTC+8">UTC+8 (Philippines Time)</option>
                                <option value="UTC+0">UTC+0 (GMT)</option>
                                <option value="UTC-5">UTC-5 (Eastern Time)</option>
                                <option value="UTC-8">UTC-8 (Pacific Time)</option>
                            </select>
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="settings-btn cancel">Cancel</button>
                        <button className="settings-btn" onClick={handleSaveSettings}>Save Changes</button>
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

export default AdminSettings;