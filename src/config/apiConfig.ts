/**
 * Base URL for API requests.
 * Falls back to a default dummy API URL if the environment variable `VITE_API_BASE_URL` is not set.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com/auth';

/**
 * Key used to store and retrieve the access token from localStorage or sessionStorage.
 * 
 * Used only in development (localhost); in production (HTTPS), the token is managed via HTTP-only cookies.
 */
export const ACCESS_KEY = 'accessToken';
