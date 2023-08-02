import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivateRoutes({ children }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}
