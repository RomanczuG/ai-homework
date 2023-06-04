import { Navigate, useLocation } from "react-router-dom";
import { supabase } from '../supabaseClient';
// import { useUser } from '@supabase/supabase-js'


export const PrivateRoute = ({ children }) => {
  
const session = supabase.auth.session();
console.log(session);

  const location = useLocation();

  return session ? children : <Navigate to="/login" state={{ from: location }} />;
};



