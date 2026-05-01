import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

import authService from '../services/authService';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const user = authService.getUser();
  const userRole = user?.role || 'b2b';
  const userName = user?.name || 'User';

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar 
        role={userRole} 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />
      
      <div 
        className="main-content"
        style={{ 
          marginLeft: sidebarCollapsed ? '80px' : '260px',
          transition: 'all 0.3s',
          minHeight: '100vh'
        }}
      >
        <Navbar userRole={userRole} userName={userName} />
        
        <div className="content-wrapper p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;