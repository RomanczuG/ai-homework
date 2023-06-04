import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ClipLoader } from 'react-spinners';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      console.log(error);
      console.log("error");
    } else if (user) {
      console.log(user);
      console.log("user logged in");
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Join us</h1>
      <p className="text-lg mb-8">Discover the world of opportunities</p>
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loading ? <ClipLoader size={20} color={'white'} /> : 'Login'}
          </button>
        </div>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};
