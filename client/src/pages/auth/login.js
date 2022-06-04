import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import AuthForm from "../../components/AuthForm"
import { authenticate } from '../../services/auth'
import AuthContext from '../../context/authContext'
import Spinner from '../../components/Spinner'

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies(['jwt']);
  const context = useContext(AuthContext);
  const navigation = useNavigate()

  const login = async (email, password) => {
    setLoading(true);
    const token = await authenticate('auth/login',{
      email,
      password,
    });

    if (token) {
      setCookie('jwt', token);
      context.setAuthenticated(true);
      setLoading(false);
      navigation('/home');
    }
  }

  return (
    <div className='mt-8'>
      <AuthForm title='Login' authHandler={login}/>
      
      {loading && <Spinner /> }
    </div>
  );
};

export default LoginPage;
