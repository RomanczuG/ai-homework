import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentSession = supabase.auth.session();

    if(currentSession) {
      setSession(true);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        if (event === 'SIGNED_IN') {
          setSession(true);
        }
        if (event === 'SIGNED_OUT') {
          setSession(false);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (loading) {
    return null; // You can add a loading screen here
  }

  return session ? children : <Navigate to="/login" state={{ from: location }} />;
};
