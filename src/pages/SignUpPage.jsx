import React, { useState } from 'react';
import "../styles/LoginPage.css"; // Reusing the same styles

const SignUpPage = ({ onSignUpSuccess, onNavigateToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

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

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
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
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      
      if (onSignUpSuccess) {
        onSignUpSuccess(userData);
      }
      
      setIsLoading(false);
    }, 2500);
  };

  const handleGoogleSignUp = () => {
    alert('Google Sign-Up would be integrated here!');
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 2, label: 'Medium' };
    }
    return { strength: 3, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength();

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
            <h1 className="login-title">Join Emo Chat</h1>
            <p className="login-subtitle">
              Start your journey of emotional connection
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`input-field ${errors.firstName ? 'input-error' : ''}`}
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`input-field ${errors.lastName ? 'input-error' : ''}`}
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formData.password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '4px', 
                    marginBottom: '4px' 
                  }}>
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        style={{
                          height: '4px',
                          flex: 1,
                          borderRadius: '2px',
                          backgroundColor: passwordStrength.strength >= level 
                            ? (level === 1 ? '#ef4444' : level === 2 ? '#f59e0b' : '#10b981')
                            : '#e5e7eb'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    color: passwordStrength.strength === 1 ? '#ef4444' 
                          : passwordStrength.strength === 2 ? '#f59e0b' 
                          : '#10b981' 
                  }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px', 
                cursor: 'pointer',
                fontSize: '14px',
                color: '#666'
              }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  style={{ 
                    marginTop: '2px',
                    accentColor: '#6366f1' 
                  }}
                />
                <span>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <span className="error-message" style={{ display: 'block', marginTop: '4px' }}>
                  {errors.terms}
                </span>
              )}
            </div>

            <button type="submit" className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  <span>Creating your account...</span>
                </>
              ) : (
                <span className="btn-text">Create Emo Chat Account</span>
              )}
            </button>
          </form>

          <div className="divider">
            <span>or sign up with</span>
          </div>

          <button className="google-button" onClick={handleGoogleSignUp} disabled={isLoading}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="login-footer">
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>Already have an account? </span>
              <button className="forgot-password-link" onClick={onNavigateToLogin} disabled={isLoading}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;