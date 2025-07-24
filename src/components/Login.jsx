import React, { useState } from 'react';
import { login, socialLogin } from '../services/authService';
import './Login.css'
import { GoogleLogin } from '@react-oauth/google';

export function Login({ toggleForm, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await login(username, password);
      onLoginSuccess();
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="form-ui">
      <form onSubmit={handleSubmit} id="form">
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Images AI</div>
            <div id="welcome-line-2">Welcome Back</div>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-inp">
              <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          {errorMessage && <p style={{ color: 'red', fontSize: '11px' }}>{errorMessage}</p>}
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await socialLogin(credentialResponse.credential);
                  onLoginSuccess();
                } catch (err) {
                  console.error('Google Login error:', err);
                  setErrorMessage('Google login failed.');
                }
              }}
              onError={() => {
                console.error('Login Failed');
                setErrorMessage('Google login failed.');
              }}
            />
          </div>
          <div id="forgot-pass">
            <a href="/">Forgot password?</a>
          </div>
          <div id="forgot-pass">
            <button onClick={toggleForm} id="switch-form">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}