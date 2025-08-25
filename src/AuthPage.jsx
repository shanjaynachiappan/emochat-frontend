import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/ChatPage';
import './styles/LoginPage.css'; // Correct path for CSS

const AuthPage = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignupTransition = () => {
    setCurrentPage('signup');
  };

  const handleLoginTransition = () => {
    setCurrentPage('login');
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <DashboardPage />
      ) : currentPage === 'login' ? (
        <LoginPage
          onSignupTransition={handleSignupTransition}
          onSuccessfulLogin={handleSuccessfulLogin}
        />
      ) : (
        <SignUpPage onLoginTransition={handleLoginTransition} />
      )}
    </>
  );
};

export default AuthPage;
