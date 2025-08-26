import React, { useState, useEffect, useRef } from 'react';
import "../styles/Dashboard.css";
import "../styles/GlobalBackground.css";


const DashboardPage = ({ onNavigate, ...props }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);
  
  // Sample AI responses for the demo
  const aiResponses = [
    "That's such a thoughtful perspective! 💭 Tell me more about how that makes you feel.",
    "I really appreciate you sharing that with me. 🌟 Your emotions are valid and important.",
    "What an interesting way to look at it! 🌈 How do you think this relates to your overall well-being?",
    "I'm here to support you through this. 💜 What would help you feel better right now?",
    "Your self-awareness is really admirable! ✨ How has this realization changed things for you?"
  ];

  // Function to add a message to the chat
  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  // Function to send a user message
  const sendMessage = () => {
    const message = inputMessage.trim();
    if (!message) return;

    addMessage(message, 'user');
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setIsTyping(false);
      addMessage(response, 'ai');
    }, 1500 + Math.random() * 1000);
  };
  
  // Effect to scroll to the bottom of the chat when a new message arrives
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  // Static chat history data for the left sidebar
  const chatHistory = [
    { day: 'Today', date: 'Aug 21', emoji: '🌟', preview: 'Discussing creative projects and feeling motivated about new opportunities...', active: true },
    { day: 'Yesterday', date: 'Aug 20', emoji: '🌙', preview: 'Late night reflections on personal growth and future aspirations...', active: false },
    { day: 'Day 3', date: 'Aug 19', emoji: '☀️', preview: 'Morning meditation and setting positive intentions for the day...', active: false },
    { day: 'Day 2', date: 'Aug 18', emoji: '🌈', preview: 'Exploring different emotional states and finding balance...', active: false },
    { day: 'Day 1', date: 'Aug 17', emoji: '🚀', preview: 'First conversation with EmoChat - sharing hopes and dreams...', active: false },
  ];

  const handleHistoryClick = (index) => {
    // Logic to switch conversations would go here. For this demo, we just alert.
    alert(`Loading conversation for ${chatHistory[index].day}`);
  };

  const handleNavClick = (page) => {
    if (onNavigate) {
      if (page.toLowerCase() === 'diary') {
        onNavigate('diary');
      } else if (page.toLowerCase() === 'dashboard') {
        onNavigate('dashboard');
      } else if (page.toLowerCase() === 'analytics') {
        onNavigate('analytics');
      }
    } else {
      alert(`${page} page would load here!`);
    }
  };

  return (
    <>
      <div className="bg-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" style={{left: `${10 + i * 10}%`, animationDelay: `${i * 0.5}s`}}></div>
        ))}
      </div>

  <div className="dashboard-app-container">
        {/* Left Sidebar - Chat History */}
        <div className="left-sidebar">
          <div className="sidebar-header">
            <div className="logo-small">💭</div>
            <div className="sidebar-title">Chat History</div>
            <div className="sidebar-subtitle">Your emotional journey</div>
          </div>
          <div className="chat-history">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`chat-entry ${entry.active ? 'active' : ''}`}
                onClick={() => handleHistoryClick(index)}
              >
                <div className="entry-header">
                  <span className="entry-emoji">{entry.emoji}</span>
                  <span className="entry-day">{entry.day}</span>
                  <span className="entry-date">{entry.date}</span>
                </div>
                <div className="entry-preview">{entry.preview}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Pane - Chat Interface */}
        <div className="central-pane">
          <div className="chat-header">
            <div className="chat-title">Today's Conversation</div>
            <div className="chat-status">
              <div className="status-dot"></div>
              EmoChat is online and ready to listen
            </div>
          </div>
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <button 
                className="input-button" 
                title="Voice input"
                onClick={() => alert('Voice input feature would be implemented here! 🎤')}
              >
                🎤
              </button>
              <input
                type="text"
                className="chat-input"
                placeholder="Share your thoughts and feelings..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="input-button" title="Send message" onClick={sendMessage}>
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Navigation */}
      <div className="top-nav">
        <button className="nav-button" onClick={() => handleNavClick('Analytics')}>
          <span className="nav-icon">📈</span>
          <span className="nav-text">Analytics</span>
        </button>
        <button className="nav-button" onClick={() => handleNavClick('Diary')}>
          <span className="nav-icon">📔</span>
          <span className="nav-text">Diary Page</span>
        </button>
      </div>
    </>
  );
};

export default DashboardPage;