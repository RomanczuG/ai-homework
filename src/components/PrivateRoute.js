import { Navigate, useLocation } from "react-router-dom";
import { supabase } from '../supabaseClient';
// import { useUser } from '@supabase/supabase-js'


export const PrivateRoute = ({ children }) => {
  
const { data, error } = supabase.auth.setSession()
console.log(data, error);

  const location = useLocation();

  return data ? children : <Navigate to="/login" state={{ from: location }} />;
};



