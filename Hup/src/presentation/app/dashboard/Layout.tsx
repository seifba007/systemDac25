import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../../../sass/pages/SuperAdmin/SuperAdminNavbar.scss';
import '../../../sass/components/SuperAdminGlobal.scss';
import { useMediaQuery } from '@mantine/hooks';
import '../../../sass/pages/SuperAdmin/sideBar.scss';
import { SuperAdminSideBar } from '@/presentation/components/admin/SuperAdminsidebar/SuperAdminSideBar';
import SuperAdminNavbar from '@/presentation/components/admin/SuperAdminNavbar/SuperAdminNavbar';
import { URLSOKIT } from '@/core/services/endpoints';
import { store } from '@/core/store';
import { logout } from '@/core/services/modulesServices/auth.service';


const SuperAdminPage = () => {
// Initialize Socket.IO client with BASE_URL
const socket = io(URLSOKIT, { 
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnection: true, // Enable reconnection
});

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const pathSegments = location.pathname.split('/');
  const isResponsive = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  // Get token from Redux store
  const accessToken = store.getState().token.accessToken;

  useEffect(() => {
    // If no token, redirect to login immediately
    if (!accessToken) {
      setIsTokenExpired(true);
      navigate('/login');
      return;
    }

    socket.emit('verify_token_expiration', { accessToken });

    // Handle token verification response
    const handleTokenResponse = (data:any) => {
      setIsTokenExpired(data.isExpired);
      if (data.isExpired) {
        logout()
          .then(() => {
            navigate('/login');
          })
          .catch((err) => {
            console.error('Logout failed:', err);
            navigate('/login'); // Redirect even if logout fails
          });
      }
    };

    // Debug: Log Socket.IO connection status
    socket.on('connect', () => console.log('Socket.IO connected'));
    socket.on('connect_error', (err) => console.error('Socket.IO connect error:', err));
    socket.on('token_verification_response', handleTokenResponse);

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('token_verification_response', handleTokenResponse);
    };
  }, [accessToken, navigate]); // Dependencies ensure effect runs if token or navigate changes

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't render the page if token is expired
  if (isTokenExpired) {
    return <></>; // Or a loading spinner while redirecting
  }

  return (
    <div className={`${!isSidebarOpen && isResponsive ? 'superadminPage2' : 'superadminPage'}`}>
      {isSidebarOpen || !isResponsive ? (
        <SuperAdminSideBar 
          adminName={'adminData?.fullName'} // Replace with actual admin name if available
          onClose={handleToggleSidebar} 
        />
      ) : <></>}
      <div className={`${isSidebarOpen && isResponsive ? 'displnone' : 'contentWrapper'}`}>
        <SuperAdminNavbar onMenuClick={handleToggleSidebar} />
        <main
          style={pathSegments[1] === 'apploader' ? { padding: '0%' } : { padding: '2%' }}
          className={`mainContent ${isSidebarOpen && isResponsive ? 'sidebarOpen' : ''}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminPage;