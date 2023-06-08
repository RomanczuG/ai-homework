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
  
    const { data: user, error: signInError } = await supabase.auth.signInWithPassword({ email:email, password:password });
  
    if (signInError) {
      setError(signInError.message);
      console.log(signInError);
      console.log("error");
    } else if (user) {
      console.log(user);
      console.log("user logged in");
      navigate('/dashboard');
    }
    else{
      console.log("user not logged in");
      console.log(user);
      console.log(signInError);
    }
  
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#F0FFE0] px-6 md:px-20 py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          Join Us
        </span>
      </h1>
      <p className="text-lg md:text-xl xl:text-2xl mb-8">
        Discover the world of opportunities
      </p>
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
            className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
          >
            {loading ? <ClipLoader size={20} color={'#252D62'} /> : 'Login'}
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => navigate("/register")} // handleRegister function needs to be implemented
            className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-sm border-[#FFC700] rounded-md transition-all duration-200"
          >
            Register
          </button>
          {/* <button
            type="button"
            // onClick={handleForgotPassword} // handleForgotPassword function needs to be implemented
            className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-sm border-[#FFC700] rounded-md transition-all duration-200"
          >
            Forgot Password
          </button> */}
        </div>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
  
  
};
