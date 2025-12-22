import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'mt@gmail.com',
    password: '122344',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <main>
      <div className='flex justify-center items-center bg-[#2F365F] h-screen'>
        <div className='shadow-md rounded-lg flex flex-col bg-white p-10 gap-5 w-96'>
          <h1 className='text-center text-3xl font-semibold text-gray-700'>Welcome back!</h1>
          <hr className='w-1/2 mx-auto text-gray-300' />
          
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex-col gap-5 flex'>
            <div className='flex flex-col'>
              <label htmlFor="email" className='text-gray-500 mb-1'>Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className='border rounded-md border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#2F365F]'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
           
            <div className='flex flex-col'>
              <label htmlFor="password" className='text-gray-500 mb-1'>Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className='border rounded-md border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#2F365F]'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="rememberMe" className='text-gray-500 flex gap-2 items-center'>
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
            </div>
            
            <div className='flex justify-end bg-gray-100 p-3 -mx-10 -mb-10 rounded-b-lg'>
              <button 
                type='submit'
                disabled={isLoading}
                className='rounded-md flex justify-center items-center px-5 py-3 text-white bg-[#2F365F] hover:bg-[#252b4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
};

export default Login;
