import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Heart, TrendingUp, Zap, Cloud, Calendar, Activity, Star, Target } from 'lucide-react';
import '../styles/AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [healingScore, setHealingScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Dummy data
  const moodTrends = [
    { day: 'Mon', mood: 7.2 },
    { day: 'Tue', mood: 6.8 },
    { day: 'Wed', mood: 8.1 },
    { day: 'Thu', mood: 7.5 },
    { day: 'Fri', mood: 9.2 },
    { day: 'Sat', mood: 8.7 },
    { day: 'Sun', mood: 8.9 }
  ];

  const emotionalCalories = [
    { emotion: 'Joy', intensity: 85 },
    { emotion: 'Calm', intensity: 72 },
    { emotion: 'Anxiety', intensity: 35 },
    { emotion: 'Energy', intensity: 68 },
    { emotion: 'Peace', intensity: 91 }
  ];

  const healingProgress = [
    { week: 'W1', consistency: 45 },
    { week: 'W2', consistency: 62 },
    { week: 'W3', consistency: 58 },
    { week: 'W4', consistency: 74 },
    { week: 'W5', consistency: 69 },
    { week: 'W6', consistency: 83 },
    { week: 'W7', consistency: 78 },
    { week: 'W8', consistency: 87 }
  ];

  const emotionTags = [
    { text: '😊 Happy', size: 'text-2xl', delay: 0 },
    { text: '😌 Calm', size: 'text-xl', delay: 100 },
    { text: '⚡ Energetic', size: 'text-lg', delay: 200 },
    { text: '🕊️ Peaceful', size: 'text-2xl', delay: 300 },
    { text: '🙏 Grateful', size: 'text-xl', delay: 400 },
    { text: '🎯 Focused', size: 'text-lg', delay: 500 },
    { text: '✨ Joyful', size: 'text-2xl', delay: 600 },
    { text: '🌸 Relaxed', size: 'text-xl', delay: 700 }
  ];

  useEffect(() => {
    setIsLoaded(true);
    // Animate healing score
    const timer = setTimeout(() => {
      setHealingScore(78);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const CircularProgress = ({ score, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#healingGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="healingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{score}</div>
            <div className="text-sm text-white text-opacity-80">Score</div>
          </div>
        </div>
      </div>
    );
  };

  const GlassCard = ({ children, className = "", delay = 0, glowColor = "rgba(0, 212, 255, 0.3)" }) => (
    <div
      className={`glass-card ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        '--glow-color': glowColor
      }}
    >
      {children}
    </div>
  );

  const AnimatedBar = ({ data, delay }) => (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.emotion} className="relative">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-white">{item.emotion}</span>
            <span className="text-white text-opacity-80">{item.intensity}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-1000 ease-out"
              style={{
                width: isLoaded ? `${item.intensity}%` : '0%',
                animationDelay: `${delay + index * 150}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="dashboard-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="header-glow">
          <h1 className="text-4xl font-bold text-white mb-2">
            ✨ Wellness Analytics Dashboard
          </h1>
          <p className="text-white text-opacity-90 text-lg">
            Track your emotional journey and healing progress
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Healing Score */}
          <GlassCard 
            delay={0} 
            className="pulse-glow" 
            glowColor="rgba(255, 107, 157, 0.4)"
          >
            <div className="section-header">
              <Heart className="floating-icon section-icon" size={24} />
              Healing Score
            </div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress score={healingScore} size={160} />
            </div>
            <div className="text-center">
              <p className="text-white text-opacity-90">
                Your healing journey is progressing beautifully! ✨
              </p>
            </div>
          </GlassCard>

          {/* Mood Trends */}
          <GlassCard 
            delay={200} 
            glowColor="rgba(0, 212, 255, 0.4)"
          >
            <div className="section-header">
              <TrendingUp className="floating-icon section-icon" size={24} />
              Weekly Mood Trends
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={moodTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                  <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.8)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.8)" />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="url(#moodGradient)" 
                    strokeWidth={4}
                    dot={{ fill: '#00d4ff', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#ff6b9d', stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={2000}
                  />
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#ff6b9d" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Emotional Energy */}
          <GlassCard 
            delay={400} 
            glowColor="rgba(0, 255, 136, 0.4)"
          >
            <div className="section-header">
              <Zap className="floating-icon section-icon" size={24} />
              Emotional Energy
            </div>
            <AnimatedBar data={emotionalCalories} delay={600} />
          </GlassCard>

          {/* Tag Cloud */}
          <GlassCard 
            delay={600} 
            glowColor="rgba(147, 51, 234, 0.4)"
          >
            <div className="section-header">
              <Cloud className="floating-icon section-icon" size={24} />
              Emotion Cloud
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center min-h-120">
              {emotionTags.map((tag, index) => (
                <span
                  key={tag.text}
                  className={`emotion-tag ${tag.size}`}
                  style={{
                    animationDelay: `${tag.delay + 800}ms`
                  }}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Healing Progress Curve - Full Width */}
          <div className="lg:col-span-2">
            <GlassCard 
              delay={800} 
              glowColor="rgba(236, 72, 153, 0.4)"
            >
              <div className="section-header">
                <Calendar className="floating-icon section-icon" size={24} />
                Healing Progress Journey
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={healingProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                    <XAxis dataKey="week" stroke="rgba(255, 255, 255, 0.8)" />
                    <YAxis stroke="rgba(255, 255, 255, 0.8)" />
                    <Line 
                      type="monotone" 
                      dataKey="consistency" 
                      stroke="url(#progressGradient)" 
                      strokeWidth={5}
                      dot={{ fill: '#ff6b9d', strokeWidth: 3, r: 7 }}
                      activeDot={{ r: 10, fill: '#00d4ff', stroke: '#fff', strokeWidth: 3 }}
                      animationDuration={3000}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ff6b9d" />
                        <stop offset="50%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <GlassCard 
            delay={1000} 
            className="text-center" 
            glowColor="rgba(251, 191, 36, 0.4)"
          >
            <div className="section-header justify-center">
              <Activity className="floating-icon" size={20} />
              Days Streak
            </div>
            <div className="stat-number">21</div>
            <div className="text-sm text-white text-opacity-80">Consecutive days</div>
          </GlassCard>
          
          <GlassCard 
            delay={1100} 
            className="text-center" 
            glowColor="rgba(16, 185, 129, 0.4)"
          >
            <div className="section-header justify-center">
              <Target className="floating-icon" size={20} />
              Achievement
            </div>
            <div className="stat-number">85%</div>
            <div className="text-sm text-white text-opacity-80">Goal completion</div>
          </GlassCard>
          
          <GlassCard 
            delay={1200} 
            className="text-center" 
            glowColor="rgba(244, 114, 182, 0.4)"
          >
            <div className="section-header justify-center">
              <Star className="floating-icon" size={20} />
              Mood Score
            </div>
            <div className="stat-number">4.8</div>
            <div className="text-sm text-white text-opacity-80">Average rating</div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
