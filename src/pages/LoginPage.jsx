import React, { useState } from 'react';
import "../styles/LoginPage.css";

const LoginPage = ({ onLoginSuccess, onNavigateToSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        email: formData.email,
        firstName: 'User' // In real app, this would come from backend
      };
      
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
      
      setIsLoading(false);
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign-In would be integrated here!');
  };

  const handleForgotPassword = () => {
    alert('Forgot password flow would be implemented here!');
  };

  return (
    <>
      <div className="bg-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${(i + 1) * 10}%` }} />
        ))}
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">💭</div>
            <h1 className="login-title">Emo Chat</h1>
            <p className="login-subtitle">
              Connect with your emotions, connect with others
            </p>
          </div>


          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`input-field ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button type="submit" className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  <span>Signing you in...</span>
                </>
              ) : (
                <span className="btn-text">Sign In to Emo Chat</span>
              )}
            </button>

            {/* Prominent Sign Up button below login */}
            <button
              type="button"
              className="signup-button"
              onClick={onNavigateToSignUp}
              onMouseEnter={() => setIsSignUpHovered(true)}
              onMouseLeave={() => setIsSignUpHovered(false)}
              disabled={isLoading}
              style={{
                width: '100%',
                marginTop: '16px',
                background: 'linear-gradient(135deg, #ff6b9d 0%, #00d4ff 100%)',
                color: 'white',
                fontWeight: 600,
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: isSignUpHovered 
                  ? '0 8px 25px rgba(0, 212, 255, 0.4), 0 0 20px rgba(255, 107, 157, 0.3)' 
                  : '0 4px 16px rgba(0, 212, 255, 0.10)',
                transform: isSignUpHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Sign Up
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button className="google-button" onClick={handleGoogleSignIn} disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="login-footer">
            <button className="forgot-password-link" onClick={handleForgotPassword} disabled={isLoading}>
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;