import useRedirectIfConn from '@/core/hooks/useRedirectIfConn';
import useRedirectIfConnlogin from '@/core/hooks/useRedirectIfConnlogin';
import { useAppDispatch } from '@/core/store/hooks';
import { clearConnectedUser, setConnectedUser } from '@/core/store/modules/authSlice';
import { clearUserToken, setUserToken } from '@/core/store/modules/tokenSlice';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface LoginEvent {
  username: string;
  event: string;
}

const Login: React.FC = () => {
  const [events, setEvents] = useState<LoginEvent[]>([]);
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
  const [socketStatus, setSocketStatus] = useState<string>('Connecting...');
  useRedirectIfConnlogin();
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
        console.log(accessToken);
        dispatch(setUserToken({ accessToken,refreshToken }));
        // Dispatch the user data to the Redux store
        dispatch(
          setConnectedUser({
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            avatar: data.user.picture,
            role: data.user.role,
          })
        );
  
      } 
    } catch (error) {

    }
  };


  useEffect(() => {
    fetchTokenVerification();
  
  }, []);

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Real-Time Login Events</h1>
      <p style={{ color: socketStatus === 'Connected' ? 'green' : 'red' }}>
        Socket Status: {socketStatus}
      </p>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        {events.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {events.map((event, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '8px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                }}
              >
                <strong>User:</strong> {event.username} <br />
                <strong>Event:</strong> {event.event}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events yet. Waiting for user logins...</p>
        )}
      </div>
      {/* Debug output */}
      <pre>Events array: {JSON.stringify(events, null, 2)}</pre>
    </div>
  );
};

export default Login;