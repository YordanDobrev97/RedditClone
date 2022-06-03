import AuthForm from "../../components/AuthForm";

const LoginPage = () => {

  const login = async (email, password) => {
    
  }

  return (
    <div className='mt-8'>
        <AuthForm title='Login' authHandler={login}/>
    </div>
  );
};

export default LoginPage;
