import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // import your supabase client
import { useEffect } from 'react';

export const PrivateRoute = ({children}) => {
  const user = supabase.auth.getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? children : null;
};

// export default PrivateRoute;
