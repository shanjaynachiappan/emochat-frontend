import React, { useState } from 'react';
import GoogleIcon from '../components/GoogleIcon';
import '../styles/LoginPage.css';

const LoginPage = ({ onSignupTransition, onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    let hasErrors = false;

    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasErrors = true;
    }

    if (!hasErrors) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onSuccessfulLogin();
      }, 2000);
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign-In would be integrated here!');
  };

  const handleForgotPassword = () => {
    alert('Forgot password flow would be implemented here!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">💭</div>
          <h1 className="login-title">Emo Chat</h1>
          <p className="login-subtitle">
            Connect with your emotions, connect with others
          </p>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={`input-field ${emailError ? 'input-error' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span
              className="error-message"
              style={{ display: emailError ? 'block' : 'none' }}
            >
              {emailError}
            </span>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`input-field ${passwordError ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="error-message"
              style={{ display: passwordError ? 'block' : 'none' }}
            >
              {passwordError}
            </span>
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Signing you in...</span>
              </>
            ) : (
              <span className="btn-text">Sign In to Emo Chat</span>
            )}
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <button className="google-button" onClick={handleGoogleSignIn}>
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="login-footer">
          <button
            className="forgot-password-link"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>

          <div>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Don't have an account?{' '}
            </span>
            <button
              className="signup-link"
              onClick={onSignupTransition}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
