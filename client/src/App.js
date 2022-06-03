import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Layout from './pages/Layout'
import HomePage from './pages/home'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
        <Route path='home' element={<HomePage />}/>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
       </Route>
      </Routes>
    </Router>
  );
}

export default App;
