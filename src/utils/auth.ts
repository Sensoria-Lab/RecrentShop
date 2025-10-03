/**
 * Authentication utilities
 */

import { API_CONFIG, AUTH_CONFIG } from '../config/constants';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  return !!token;
};

/**
 * Get auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
};

/**
 * Get current admin user
 */
export const getCurrentUser = (): { id: number; username: string } | null => {
  const userStr = localStorage.getItem(AUTH_CONFIG.USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Logout user
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
  localStorage.removeItem(AUTH_CONFIG.USER_KEY);
};

/**
 * Verify token with server
 */
export const verifyToken = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    const data = await response.json();
    return data.valid === true;
  } catch {
    return false;
  }
};
