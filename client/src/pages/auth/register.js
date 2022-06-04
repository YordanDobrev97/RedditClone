import AuthForm from "../../components/AuthForm"
import { DEFAULT_HEADERS } from '../../utils/headers'
import { authenticate } from '../../services/auth'
import { useCookies } from 'react-cookie'

const RegisterPage = () => {
  const [_, setCookie] = useCookies(['jwt']);

  const register = async (email, password) => {
    const token = await authenticate('auth/register', 'POST', DEFAULT_HEADERS, { email, password })
    
    if (token) {
      setCookie('jwt', token);
    }
  }

  return (
    <div className='mt-8'>
      <AuthForm title='Sign Up' authHandler={register}/>
    </div>
  );
};

export default RegisterPage;
