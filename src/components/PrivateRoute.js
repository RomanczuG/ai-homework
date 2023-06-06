import { Route, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // import your supabase client

export const PrivateRoute = (props) => {
  const user = supabase.auth.user();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return <Route {...props} />;
};

// export default PrivateRoute;
