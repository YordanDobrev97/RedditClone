import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'
import { useCookies } from 'react-cookie'
import parseJwt from '../utils/jwtParser'

const Navbar = () => {
  const context = useContext(AuthContext)
  const navigation = useNavigate()
  const [cookies, _, removeCookie] = useCookies(['jwt'])
  const user = parseJwt(cookies?.jwt)

  const logout = () => {
    context.setAuthenticated(false)
    removeCookie('jwt')
    navigation('/home')
  };

  return (
    <nav className='border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex flex-wrap justify-between items-center mx-auto border-grey-lightest border-b'>
        <div className='container mx-auto flex'>
          <div className='w-3/5 flex'>
            <div className='w-1/5'>
              <Link to='/home'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Reddit_logo.svg/2560px-Reddit_logo.svg.png'
                  alt='reddit-logo'
                />
              </Link>
            </div>
          </div>
          <div className='w-2/5 flex flex-wrap justify-end items-center'>
            {context.isAuthenticated ? (
              <div className='flex flex-col mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium'>
                <Link
                  className='mr-3 inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                  to='/community/create'
                >
                  New Community
                </Link>
                <Link
                  className='mr-3 inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                  to='/posts/create'
                >
                  New Post
                </Link>
                <span>Hello, {user.userID.username}</span>
                <button
                  onClick={logout}
                  className='ml-3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to='/login'
                  className='border px-8 py-2.5 font-semibold text-xs rounded ml-4'
                >
                  LOG IN
                </Link>
                <Link
                  to='/register'
                  className='border px-8 py-2.5 font-semibold text-xs rounded ml-4'
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
