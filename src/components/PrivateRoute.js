import { Navigate, useLocation } from "react-router-dom";
import { supabase } from '../supabaseClient';


export const PrivateRoute = ({ children }) => {
  
const { data: { user } } = supabase.auth.getUser()

  const location = useLocation();

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};



