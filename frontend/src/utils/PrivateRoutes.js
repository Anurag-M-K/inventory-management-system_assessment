import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivateRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If there's no token, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  return children;
}
