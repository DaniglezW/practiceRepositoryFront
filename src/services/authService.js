const API_URL = 'http://localhost:8082/auth';

const handleResponse = (response) => {
  return response.json().then((data) => {
    if (data.code !== 0) {
      throw new Error(data.message || 'Error during request');
    }
    return data;
  });
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  return handleResponse(response);
};

export const register = async (username, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(response);
};

export const refreshToken = async () => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await handleResponse(response);
  return data.code === 0;
};

export const verifyToken = async () => {
  const response = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.ok;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);  
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const socialLogin = async (idToken, provider = 'google') => {
  const response = await fetch(`${API_URL}/social-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ idToken, provider }),
  });
  return handleResponse(response);
};