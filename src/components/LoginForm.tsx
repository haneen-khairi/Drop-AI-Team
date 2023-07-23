import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/pages/login.css';
import { Link } from 'react-router-dom';
import { LoginFormProps } from '../utils/types';

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [mobile_number, setMobile_number] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleMobile_numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobile_number(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://dropshipping-app-ingsl.ondigitalocean.app/account/login/', {
        mobile_number,
        password,
      });
  
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.data && responseData.data.access) {
          // Login successful
          const token = responseData.data.access;
          localStorage.setItem(`token`,token)
          onLoginSuccess(token);
          window.location.href = `/`;
        } else {
          // Login failed
          setError('Invalid mobile_number or password');
        }
      } else {
        // Non-200 status code
        setError('An error occurred');
      }
    } catch (error) {
      // Handle the error
      setError('An error occurred');
    }
  };
  

  return (
    <div className="col-md-12">
      <div className="card card-bgwhite card-bgwhite-container">
        <div className="titel">
          <h1>Logo</h1>
          <h3>Welcome Back</h3>
        </div> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mobile_number">Phone number</label>
            <input
              type="number"
              id="mobile_number"
              value={mobile_number}
              onChange={handleMobile_numberChange}
              className="form-control"
            />
             <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.8626 16.3492C17.8434 16.2142 17.8202 16.0963 17.796 15.9913C17.6502 15.3663 17.1968 14.8902 16.6409 14.7802L13.031 14.0593C12.4993 13.9523 11.9668 14.1993 11.6401 14.7013C11.5951 14.7703 11.5518 14.8402 11.5118 14.9112C11.4526 15.0152 11.3351 15.1123 11.2076 15.0453C9.33515 14.0683 7.8568 12.2942 7.04347 10.0472C6.9868 9.89221 7.06594 9.75622 7.15094 9.68722C7.23011 9.62322 7.30678 9.55427 7.38094 9.48227C7.78678 9.08827 7.98848 8.45825 7.90681 7.83725L7.34763 3.58224C7.2618 2.93024 6.88932 2.3972 6.37432 2.1932C6.25349 2.1452 6.11349 2.10125 5.95099 2.06625C4.89599 1.84025 3.8168 2.19821 2.98763 3.05221C2.11847 3.94821 1.63679 5.25028 1.66846 6.62228C1.85096 14.7443 7.29428 21.2773 14.0626 21.4963C14.0968 21.4973 14.131 21.4983 14.1652 21.4983C15.2627 21.4983 16.3001 20.9282 17.0243 19.9222C17.7418 18.9252 18.0476 17.6222 17.8626 16.3492ZM16.0768 18.9422C15.576 19.6372 14.8476 20.0083 14.0951 19.9983C7.99178 19.8003 3.08178 13.9072 2.91678 6.58224C2.89678 5.66324 3.21846 4.79127 3.80179 4.19027C4.24263 3.73627 4.76845 3.49826 5.31679 3.49826C5.45345 3.49826 5.59181 3.5132 5.73015 3.5422C5.82681 3.5632 5.90928 3.58828 5.98095 3.61728C6.05012 3.64428 6.10095 3.72125 6.11345 3.81625L6.67263 8.07125C6.68513 8.16425 6.65515 8.25827 6.59598 8.31527C6.54765 8.36227 6.49845 8.40623 6.44762 8.44723C5.83595 8.94623 5.60932 9.85023 5.89682 10.6452C6.83682 13.2412 8.54598 15.2923 10.7085 16.4203C11.3685 16.7643 12.1235 16.4933 12.5443 15.7563C12.5693 15.7133 12.5951 15.6703 12.6235 15.6263C12.6685 15.5573 12.7468 15.5243 12.826 15.5383L16.436 16.2592C16.5126 16.2752 16.5768 16.3312 16.5926 16.3962C16.6076 16.4582 16.6201 16.5273 16.6318 16.6063C16.7518 17.4343 16.5493 18.2852 16.0768 18.9422Z" fill="#555555" />
            </svg>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
            />
          
           
          </div>
          {/* <a className="forget">Forgot password ?</a> */}
          <button type="submit" className="btn btn-primary loginbtn">Log In</button>
          {/* <div className="foterr">
            <p>Dont have an account?</p>
            <Link to={'/signup'}>Sign up</Link>
          </div> */}
          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
