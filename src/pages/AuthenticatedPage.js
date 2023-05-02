import React from 'react';
import { useNavigate } from 'react-router-dom';


import { supabase } from '../supabaseClient';


export const AuthenticatedPage = () => {
    const navigate = useNavigate();


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');

  };

  return (
    <div>
      <h1>Authenticated User Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


