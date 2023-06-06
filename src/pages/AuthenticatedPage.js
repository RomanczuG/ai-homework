import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const AuthenticatedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const { data, error } = await supabase
        .from('your-protected-flask-route')
        .select('*');

      if (error) {
        console.error('Error fetching protected data:', error);
      } else {
        setMessage(data);
      }
    };

    fetchProtectedData();
  }, []);
  const [error, setError] = useState(null)
  // naviage to login page if not logged in
  const navigate = useNavigate()
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error)
    }
    else
    {
      navigate('/')
    }

      
  }

  return (
    <div>
      <h1>Authenticated Page</h1>
      <p>{message}</p>
      <button onClick={handleLogout}> logout</button> 
    </div>
  );
};
