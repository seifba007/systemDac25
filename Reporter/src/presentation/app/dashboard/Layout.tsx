import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../../../sass/pages/SuperAdmin/SuperAdminNavbar.scss';
import '../../../sass/components/SuperAdminGlobal.scss';

import { useMediaQuery } from '@mantine/hooks';
import '../../../sass/pages/SuperAdmin/sideBar.scss';
import SuperAdminNavbar from '@/presentation/components/admin/SuperAdminNavbar/SuperAdminNavbar';
import { useAppDispatch } from '@/core/store/hooks';
import { clearConnectedUser, setConnectedUser } from '@/core/store/modules/authSlice';
import { clearUserToken, setUserToken } from '@/core/store/modules/tokenSlice';
import { logout } from '@/core/services/modulesServices/auth.service';
import useRedirectIfConn from '@/core/hooks/useRedirectIfConn';

const SuperAdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isResponsive = useMediaQuery('(max-width: 768px)');
  const [events, setEvents] = useState<any>([]);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useRedirectIfConn();
  const fetchTokenVerification = async () => {
 
    try {
      const response = await fetch('http://localhost:5000/auth/verify-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Just the content-type, no token
        },
      });
  
      // Check if the response is ok
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
         const accessToken=data.accessToken
        const refreshToken=data.refreshToken
        dispatch(setUserToken({ accessToken,refreshToken }));
        // Dispatch the user data to the Redux store
        dispatch(
          setConnectedUser({
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            avatar: data.user.picture,
            role: data.user.role,
            organization: data.user.organization,
          })
        );
  
      } 
    } catch (error) {
     dispatch(clearUserToken());
        dispatch(
          clearConnectedUser()
        );
  
    }
  };
  useEffect(() => {
    fetchTokenVerification();
  
  }, []);

  return (
    <div className={`${!isSidebarOpen && isResponsive ? 'superadminPage2' : 'superadminPage'}`}>
      <div className={`${isSidebarOpen && isResponsive ? 'displnone' : 'contentWrapper'}`}>
        <SuperAdminNavbar />
        <main className={`${'mainContent'} ${isSidebarOpen && isResponsive ? 'sidebarOpen' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminPage;
