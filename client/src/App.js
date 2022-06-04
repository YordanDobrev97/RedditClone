import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Layout from "./pages/Layout";
import HomePage from "./pages/home";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import AuthContext from "./context/authContext";

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
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
