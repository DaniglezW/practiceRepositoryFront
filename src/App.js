import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import { getCookie, refreshToken, verifyToken } from './services/authService';
import { Constants } from './utils/Constants';
import Loading from './components/Loding';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '1067738625405-8nndn3lkooalhvb0q4t02jvi8tpd54p7.apps.googleusercontent.com';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = getCookie(Constants.token);
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        const valid = await verifyToken();
        if (valid) {
          setIsAuthenticated(true);
        } else {
          const refreshedToken = await refreshToken();
          if (refreshedToken) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const updateAuthentication = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  if (loading) return <Loading />;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated
              ? (<Navigate to="/home" />)
              : (<Home onAuthChange={updateAuthentication} />)
          }
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}