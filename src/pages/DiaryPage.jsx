import React, { useState, useEffect } from 'react';
import './DiaryPage.css';

const DiaryPage = () => {
  const [diaryText, setDiaryText] = useState('');
  const [entries, setEntries] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Theme configurations and emojis are now constants in this file
  const themes = {
    purple: {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      name: '💜 Purple Dreams'
    },
    ocean: {
      gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00cec9 50%, #55efc4 75%, #fd79a8 100%)',
      name: '🌊 Ocean Breeze'
    },
    sunset: {
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 25%, #e84393 50%, #fd79a8 75%, #6c5ce7 100%)',
      name: '🌅 Sunset Glow'
    },
    forest: {
      gradient: 'linear-gradient(135deg, #00b894 0%, #00cec9 25%, #74b9ff 50%, #a29bfe 75%, #fd79a8 100%)',
      name: '🌲 Forest Magic'
    }
  };

  const emojis = ['😊', '😍', '🥳', '😢', '😴', '🤔', '😎', '🙂', '😘', '🤗', '😇', '🥰', '🤩', '😋', '🤯'];

  const addEmoji = (emoji) => {
    setDiaryText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (diaryText.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [diaryText]);

  useEffect(() => {
    const sampleEntries = [
      {
        id: 1692123456789,
        text: "Had an amazing day at the beach today! 🌊 The sunset was absolutely breathtaking, and I felt so peaceful watching the waves. Sometimes it's the simple moments that bring the most joy. I'm grateful for days like these that remind me to slow down and appreciate the beauty around us. 😊✨",
        date: "Tuesday, August 15, 2023",
        timestamp: "7:30 PM",
        mood: "😊"
      },
      {
        id: 1692037056789,
        text: "Started learning to play guitar today. 🎸 My fingers are sore but I'm excited about this new journey. Music has always been my escape, and now I can create it myself! 🎵",
        date: "Monday, August 14, 2023",
        timestamp: "9:15 PM",
        mood: "🤩"
      }
    ];
    setEntries(sampleEntries);
  }, []);

  const saveEntry = () => {
    if (diaryText.trim() === '') return;
    const newEntry = {
      id: Date.now(),
      text: diaryText,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      mood: emojis[Math.floor(Math.random() * emojis.length)]
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setDiaryText('');
    setIsAnimating(true);
    const saveBtn = document.querySelector('.save-button');
    if (saveBtn) {
      saveBtn.classList.add('bounce');
      setTimeout(() => saveBtn.classList.remove('bounce'), 600);
    }
    setTimeout(() => setIsAnimating(false), 600);
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div className={`diary-page ${currentTheme}`}>
      <div className="diary-container">
        {/* Top Navigation Bar */}
        <div className="top-bar">
          <button className="nav-button back-button">
            <span className="button-icon">←</span>
            Back to Chat
          </button>
          <h1 className="page-title">My Diary</h1>
          <button className="nav-button dashboard-button">
            <span className="button-icon">⚡</span>
            Dashboard
          </button>
        </div>

        {/* Theme Selector */}
        <div className="theme-selector">
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              className={`theme-button ${currentTheme === themeName ? 'active' : ''}`}
              onClick={() => setCurrentTheme(themeName)}
            >
              {themes[themeName].name}
            </button>
          ))}
        </div>

        <div className="diary-content">
          {/* Main Diary Input Section */}
          <div className="diary-input-section">
            <div className="diary-card main-card">
              <div className="card-header">
                <h2 className="section-title">What's on your mind today?</h2>
                <div className="current-date">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
              
              {/* Interactive Buttons */}
              <div className="interactive-buttons">
                <button 
                  className="action-button clear-button ripple-container" 
                  onClick={(e) => { setDiaryText(''); createRipple(e); }}
                >
                  <span>🗑️</span> Clear All
                </button>
                <button className="action-button word-count-button">
                  <span>📊</span> {diaryText.split(' ').filter(word => word.length > 0).length} words
                </button>
                <div style={{ position: 'relative' }}>
                  <button 
                    className="action-button stats-button ripple-container"
                    onClick={(e) => { setShowStats(!showStats); createRipple(e); }}
                  >
                    <span>📈</span> Writing Stats
                  </button>
                  {showStats && (
                    <div className="stats-panel">
                      <div className="stat-item">
                        <span>Total Entries:</span>
                        <span className="stat-value">{entries.length}</span>
                      </div>
                      <div className="stat-item">
                        <span>Current Characters:</span>
                        <span className="stat-value">{diaryText.length}</span>
                      </div>
                      <div className="stat-item">
                        <span>Current Words:</span>
                        <span className="stat-value">{diaryText.split(' ').filter(word => word.length > 0).length}</span>
                      </div>
                      <div className="stat-item">
                        <span>Avg Entry Length:</span>
                        <span className="stat-value">
                          {entries.length > 0 ? Math.round(entries.reduce((sum, entry) => sum + entry.text.length, 0) / entries.length) : 0} chars
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Emoji Section */}
              <div className="emoji-section">
                <button 
                  className="emoji-button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Add emotion</span>
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        className="emoji-option"
                        onClick={() => addEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ position: 'relative' }}>
                <textarea
                  className={`diary-textarea ${isTyping ? 'typing' : ''}`}
                  value={diaryText}
                  onChange={(e) => setDiaryText(e.target.value)}
                  placeholder="Dear diary, today I feel..."
                  rows="12"
                />
                {isTyping && (
                  <div className="typing-indicator">✍️ Writing...</div>
                )}
              </div>
              
              <div className="diary-actions">
                <div className="word-count">
                  {diaryText.length} characters • {diaryText.split(' ').filter(word => word.length > 0).length} words
                </div>
                <button 
                  className="save-button ripple-container"
                  onClick={(e) => { saveEntry(); createRipple(e); }}
                  disabled={diaryText.trim() === ''}
                >
                  <span className="button-icon">✨</span>
                  Save Entry
                </button>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="diary-history-section">
            <div className="history-header">
              <h3 className="history-title">Past Entries</h3>
              <div className="entries-count">{entries.length} entries</div>
            </div>
            
            <div className="history-list">
              {entries.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <p>No entries yet. Start writing your first diary entry!</p>
                </div>
              ) : (
                entries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className={`history-card ${index === 0 && isAnimating ? 'slide-in' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="entry-header">
                      <div className="entry-date">{entry.date}</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="entry-time">{entry.timestamp}</div>
                        {entry.mood && <div className="entry-mood">{entry.mood}</div>}
                        <button 
                          className="delete-button"
                          onClick={() => deleteEntry(entry.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="entry-preview">
                      {entry.text.length > 150 
                        ? `${entry.text.substring(0, 150)}...` 
                        : entry.text
                      }
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Orbs */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape circle-shape" style={{ left: '15%', animationDelay: '0s' }}></div>
        <div className="shape triangle-shape" style={{ left: '25%', animationDelay: '3s' }}></div>
        <div className="shape square-shape" style={{ left: '45%', animationDelay: '6s' }}></div>
        <div className="shape diamond-shape" style={{ left: '65%', animationDelay: '9s' }}></div>
        <div className="shape circle-shape" style={{ left: '75%', animationDelay: '12s' }}></div>
        <div className="shape triangle-shape" style={{ left: '85%', animationDelay: '15s' }}></div>
      </div>

      {/* Twinkling Stars */}
      <div className="twinkling-stars">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Wave Animation */}
      <div className="wave-animation">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Floating Particles Animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default DiaryPage;