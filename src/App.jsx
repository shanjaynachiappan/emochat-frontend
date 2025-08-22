import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import DiaryPage from './pages/DiaryPage'; 


function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle transitions
  const handleSignupTransition = () => {
    setCurrentPage('signup');
  };

  const handleLoginTransition = () => {
    setCurrentPage('login');
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleGoToDiary = () => {
    setCurrentPage('diary');
  };

  const handleGoToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <>
      <div className="bg-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {isLoggedIn ? (
        currentPage === 'dashboard' ? (
          <DashboardPage onGoToDiary={handleGoToDiary} />
        ) : (
          <DiaryPage onBackToDashboard={handleGoToDashboard} />
        )
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
}

export default App;
