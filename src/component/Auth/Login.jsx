import React, { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import '../../style/Login.css';
// import { X } from '@mui/icons-material';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

const handleLogin = (e) => {
  e.preventDefault();

  // console.log(user);
  axios
    .post('http://localhost:5000/login/', {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      const expiryTime = Date.now() + 30 * 60 * 1000;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('tokenExpiry', expiryTime);

      dispatch({ type: 'LOGIN', payload: res.data.token });
      navigate('/');

      // Optional: Auto logout after expiry
      setTimeout(() => {
        localStorage.clear();
        navigate('/login');
      }, 30 * 60 * 1000);

      // Optional: Clear input fields
      setUser({ username: '', password: '' });

    })
    .catch((err) => {
      const msg =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
      console.error('Login error:', msg);
    });
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
{/* 
        <p className="signup-text">
          Don't have an account?{' '}
          <Link to="/create_account" className="signup-link">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
