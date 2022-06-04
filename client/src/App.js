import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Layout from "./pages/Layout"
import HomePage from "./pages/home"
import RegisterPage from "./pages/auth/register"
import LoginPage from "./pages/auth/login"
import CommunityLayout from "./pages/community/Layout"
import CommunityCreate from "./pages/community/create"
import PostLayout from "./pages/post/Layout"
import Posts from "./pages/post"
import CreatePost from "./pages/post/create"
import Details from "./pages/post/details"
import AuthContext from "./context/authContext"

import "./App.css";

function App() {
  const [cookies] = useCookies(["jwt"]);
  const [isAuthenticated, setAuthenticated] = useState(cookies?.jwt || false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path='community' element={<CommunityLayout />}>
              <Route path='create' element={<CommunityCreate />}/>
            </Route>
            <Route path='posts' element={<PostLayout />}>
              <Route path='index' element={<Posts />}/>
              <Route path='create/:communityId' element={<CreatePost />}/>
              <Route path='details/:id' element={<Details />}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
