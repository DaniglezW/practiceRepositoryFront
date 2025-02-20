import React, { useState } from "react";
import { login, register } from '../services/authService';
import "./Login.css";

export function Register({ toggleForm, onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('')
    try {
      await register(username, email, password);

      const response = await login(username, password);
      localStorage.setItem('token', response.data);
      onRegisterSuccess();
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
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
            <div id="welcome-line-2">Register</div>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-inp">
              <input placeholder="Email Address" type="text"  value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-inp">
              <input placeholder="Password" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </div>
          <div id="forgot-pass">
            <button onClick={toggleForm} id="switch-form">
              Back to Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}