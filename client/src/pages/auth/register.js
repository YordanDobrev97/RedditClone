import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { authenticate } from '../../services/auth'
import AuthContext from '../../context/authContext'
import Spinner from '../../components/Spinner'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const [_, setCookie] = useCookies(['jwt'])
  const context = useContext(AuthContext)
  const navigation = useNavigate()

  const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = async(data) => {
    setLoading(true)

    const token = await authenticate('auth/register', data)
      if (token) {
      setCookie('jwt', token)
      context.setAuthenticated(true);
      setLoading(false)
      navigation('/home')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} class='w-full max-w-sm mt-12 m-auto'>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-full-name'
            type='text'
            {...register('username')} placeholder='Username' 
          />
        </div>
      </div>

      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-full-name'
            type='email'
            {...register('email')}
            placeholder='Email' 
          />
        </div>
      </div>

      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-password'
            type='password'
            {...register('password', { required: true, minLength: 8 })} placeholder='Password'  
          />
          {errors.password && <span className='text-red-500 text-xs italic'>The password is required and must contain at least 8 characters</span>}
        </div>
      </div>

      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </div>
      {loading && <Spinner />}
    </form>
  );
};

export default RegisterPage;
