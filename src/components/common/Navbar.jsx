import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, ChevronDown, Search } from 'lucide-react';

const Navbar = ({ userRole, userName }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    window.dummyDataStorage.removeItem('userRole');
    window.dummyDataStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="modern-navbar">
      <div className="d-flex justify-content-between align-items-center">
        <div className="navbar-search">
          
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light position-relative p-2 rounded-circle">
            <Bell size={18} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
              3
            </span>
          </button>
          
          <div className="dropdown">
            <button 
              className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-avatar" style={{ width: '35px', height: '35px' }}>
                {userName?.charAt(0) || 'U'}
              </div>
              <span className="fw-500">{userName || 'User'}</span>
              <ChevronDown size={16} />
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg border-0 rounded-3" style={{ minWidth: '220px' }}>
                <div className="px-3 py-2 border-bottom">
                  <div className="fw-600">{userName || 'User'}</div>
                  <small className="text-muted">{userRole === 'b2b' ? 'PG Owner' : 'Administrator'}</small>
                </div>
                <button className="dropdown-item py-2 d-flex align-items-center gap-2">
                  <User size={16} /> Profile
                </button>
                <button className="dropdown-item py-2 d-flex align-items-center gap-2">
                  <Settings size={16} /> Settings
                </button>
                <hr className="my-1" />
                <button 
                  className="dropdown-item py-2 text-danger d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;