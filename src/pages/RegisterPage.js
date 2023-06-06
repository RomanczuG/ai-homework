import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ClipLoader } from 'react-spinners';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { user, error } = await supabase.auth.signUp({ email:email, password:password });

    if (error) {
      setError(error.message);
      console.log(error);
      console.log("error");
    } else if (user) {
      console.log(user);
      console.log("user created");
      navigate('/login');
    }

    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#F0FFE0] px-6 md:px-20 py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          Create Your Account
        </span>
      </h1>
      <p className="text-lg md:text-xl xl:text-2xl mb-8">
        Join our amazing community
      </p>
      <form onSubmit={handleRegister} className="w-full max-w-md">
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
            className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
          >
            {loading ? <ClipLoader size={20} color={'#252D62'} /> : 'Register'}
          </button>
        </div>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
};
