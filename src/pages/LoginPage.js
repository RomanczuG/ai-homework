import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ClipLoader } from 'react-spinners';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { Button } from '../utils/ToolUtils';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const resetPassword = async () => {
    const emailforgot = prompt('Please enter your email:');
    if (!emailforgot) {
      alert('Please enter your email!');
      return;
    }
    await supabase.auth.resetPasswordForEmail(emailforgot);
    // await supabase.auth.api.resetPasswordForEmail(emailforgot);
    alert('Check your email for the password reset link!');
  };

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
      window.sa_event("login", {"email" : email});
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
    <motion.section
      className="flex flex-col items-center justify-center min-h-screen bg-[#F0FFE0] py-16 px-6 md:px-20  pattern-grid-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
      <title>Login | Study Smarter Now!</title>
      <meta
        name="description"
        content="Login to your account and unlock powerful tools for smarter studying and effective test taking strategies."
      />
      <link rel="canonical" href="https://studysmarternow.com/login" />
    </Helmet>

      <form onSubmit={handleLogin} className="w-full max-w-md shadow-lg p-8 rounded-lg space-y-6 bg-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          Welcome Back!
        </span>
      </h1>
      <p className="text-lg md:text-xl xl:text-2xl mb-8 text-center">
        Log in to your account and unlock powerful tools for smarter studying, effective test taking strategies, and comprehensive homework help.
      </p>
        <div className="relative">
          <HiMail className="absolute text-[#FF6E00] left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="relative">
          <HiLockClosed className="absolute text-[#FF6E00] left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="remember" className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="mr-2"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={resetPassword}
            // onClick={handleForgotPassword}
            className="text-[#FF6E00] hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <Button
          type="submit"
          disabled={loading}
          variant="solid"
          color="primary"
          fullWidth
        >
          {loading ? <ClipLoader size={20} color={'#252D62'} /> : 'Login'}
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/register")}
          variant="outline"
          color="primary"
          fullWidth
        >
          Create an account
        </Button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </motion.section>
  );
};