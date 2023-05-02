import React from 'react';
import { useHistory } from 'react-router-dom';
import supabase from '../supabaseClient';

const AuthenticatedPage = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    history.push('/login');
  };

  return (
    <div>
      <h1>Authenticated User Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AuthenticatedPage;
