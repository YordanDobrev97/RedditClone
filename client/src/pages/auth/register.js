import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/AuthForm'
import { DEFAULT_HEADERS } from '../../utils/headers'
import { authenticate } from '../../services/auth'
import AuthContext from '../../context/authContext'
import Spinner from '../../components/Spinner'
import { useCookies } from 'react-cookie'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies(['jwt']);
  const context = useContext(AuthContext);
  const navigation = useNavigate();

  const register = async (email, password) => {
    setLoading(true)
    const token = await authenticate('auth/register', {
      email,
      password,
    });

    if (token) {
      setCookie('jwt', token);
      context.setAuthenticated(true);
      setLoading(false);
      navigation('/home');
    }
  };

  return (
    <div className='mt-8'>
      <AuthForm title='Sign Up' authHandler={register} />

      {loading && <Spinner /> }
    </div>
  );
};

export default RegisterPage;
