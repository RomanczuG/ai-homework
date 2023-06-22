import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { ClipLoader } from 'react-spinners';
import { Button } from '../utils/ToolUtils';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if(password !== repeatPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email:email, password:password });

    if (error) {
      setError(error.message);
      console.log(error);
      console.log("error");
    } else if (user) {
      console.log(user);
      console.log("user created");
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          { user_id: user.id, subscription_type: 'free' },
        ]);
    }
    window.sa_event('Register', { email: email });

    setLoading(false);
    alert('Check your email for the confirmation link!');
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-screen bg-[#F0FFE0] py-16 px-6 md:px-20  pattern-grid-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
      <title>Register | Study Smarter Now!</title>
      <meta
        name="description"
        content="Join our amazing community and facilitate smarter studying and effective test taking. Sign up for homework help and other resources."
      />
      <link rel="canonical" href="https://www.studysmarternow.com/register" />
    </Helmet>
      

      <form onSubmit={handleRegister} className="w-full max-w-md shadow-lg p-8 rounded-lg space-y-6 bg-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          Create Your Account
        </span>
      </h1>
      <p className="text-lg md:text-xl xl:text-2xl mb-8 text-center">
        Join our amazing community and access powerful tools for smarter studying, effective test taking strategies, and comprehensive homework help.
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
        <div className="relative">
          <HiLockClosed className="absolute text-[#FF6E00] left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="flex justify-center"> */}
          <Button variant="solid" color="yellow" className="w-full" type="submit" disabled={loading}>
            {loading ? <ClipLoader size={20} color={'#252D62'} /> : 'Register'}
          </Button>
        {/* </div> */}
      </form>
      <div className="mt-4">
        Already have an account?{' '}
        <Button variant="link" color="yellow" onClick={() => navigate('/login')}>
          Log In
        </Button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </motion.section>
  );
};