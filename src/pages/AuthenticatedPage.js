import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthenticatedPage = () => {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchProtectedData = async () => {
  //     const { data, error } = await supabase
  //       .from('your-protected-flask-route')
  //       .select('*');

  //     if (error) {
  //       console.error('Error fetching protected data:', error);
  //     } else {
  //       setMessage(data);
  //     }
  //   };

  //   fetchProtectedData();
  // }, []);

  return (
    <div>
      <h1>Authenticated Page</h1>
      <p>{message}</p>
    </div>
  );
};
