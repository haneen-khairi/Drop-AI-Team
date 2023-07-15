
import React from 'react';
import LoginForm from '../components/LoginForm';
import '../assets/styles/pages/login.css';
const Login: React.FC = () => {
  const handleLoginSuccess = (token: string) => {
    // Save the token to local storage or perform any other actions
    console.log('Login successful. Token:', token);
  };

  return (
    <div>
   
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
