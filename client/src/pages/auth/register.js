import AuthForm from "../../components/AuthForm"

const RegisterPage = () => {
  const register = (email, password) => {
    console.log(email, password)
  }

  return (
    <div className='mt-8'>
      <AuthForm title='Sign Up' authHandler={register}/>
    </div>
  );
};

export default RegisterPage;
