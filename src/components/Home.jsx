import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export default function Home({ onAuthChange }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthentication = () => {
    onAuthChange(true)
  };

  return (
    <div>
      {isLogin ? (
        <Login toggleForm={() => setIsLogin(false)} onLoginSuccess={handleAuthentication} />
      ) : (
        <Register toggleForm={() => setIsLogin(true)} onRegisterSuccess={handleAuthentication} />
      )}
    </div>
  );
}