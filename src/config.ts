// Configuration for API Endpoints
const isDevelopment = import.meta.env.MODE === 'development';

// In development, we use the Vite proxy (relative path).
// In production, we use the VITE_API_URL environment variable, 
// or fallback to the Render backend URL if you hardcode it here.
export const API_BASE_URL = isDevelopment 
  ? '' 
  : (import.meta.env.VITE_API_URL || 'https://your-render-backend-name.onrender.com');

export const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;
