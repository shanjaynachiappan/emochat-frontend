import React, { useState } from 'react';
import GoogleIcon from '../components/GoogleIcon';
import '../styles/LoginPage.css';

const SignUpPage = ({ onLoginTransition }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    if (firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
      hasErrors = true;
    }
    if (lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
      hasErrors = true;
    }
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasErrors = true;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    if (!termsChecked) {
      alert('Please accept the Terms of Service and Privacy Policy');
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        alert('Account created successfully! Welcome to Emo Chat! (This is a demo)');
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google Sign-Up would be integrated here!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">💭</div>
          <h1 className="login-title">Join Emo Chat</h1>
          <p className="login-subtitle">Start your emotional journey with us</p>
        </div>

        <form onSubmit={handleSignupSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label" htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                className={`input-field ${errors.firstName ? 'input-error' : ''}`} 
                placeholder="John" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
              <span className="error-message" style={{ display: errors.firstName ? 'block' : 'none' }}>{errors.firstName}</span>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                className={`input-field ${errors.lastName ? 'input-error' : ''}`} 
                placeholder="Doe" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
              <span className="error-message" style={{ display: errors.lastName ? 'block' : 'none' }}>{errors.lastName}</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className={`input-field ${errors.email ? 'input-error' : ''}`} 
              placeholder="john.doe@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <span className="error-message" style={{ display: errors.email ? 'block' : 'none' }}>{errors.email}</span>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className={`input-field ${errors.password ? 'input-error' : ''}`} 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <span className="error-message" style={{ display: errors.password ? 'block' : 'none' }}>{errors.password}</span>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`} 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            <span className="error-message" style={{ display: errors.confirmPassword ? 'block' : 'none' }}>{errors.confirmPassword}</span>
          </div>

          <div className="terms-checkbox">
            <input 
              type="checkbox" 
              id="termsCheck" 
              style={{ width: '20px', height: '20px', accentColor: '#667eea', cursor: 'pointer', marginTop: '2px' }} 
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              required 
            />
            <label htmlFor="termsCheck" style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5', cursor: 'pointer' }}>
              I agree to the <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a> 
              and <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Creating your account...</span>
              </>
            ) : (
              <span className="btn-text">Create Your Emo Chat Account</span>
            )}
          </button>
        </form>

        <div className="divider">
          <span>or sign up with</span>
        </div>

        <button className="google-button" onClick={handleGoogleSignUp}>
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="login-footer">
          <div style={{ marginTop: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Already have an account? </span>
            <button className="forgot-password-link" onClick={onLoginTransition}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;