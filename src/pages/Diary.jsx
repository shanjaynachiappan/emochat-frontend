

import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Heart, Trash2, Plus, Edit3, Eye, ChevronLeft } from 'lucide-react';
import '../styles/HomePage.css';

// Accept navigation props from App
export default function DiaryApp({ onNewEntry, onEditEntry, onViewEntry, onBack }) {
  const [entries, setEntries] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  const handleDelete = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="diary-app-container">
      <button
        onClick={onBack}
        className="back-button-top-right"
      >
        <ChevronLeft className="button-icon" />
        Back
      </button>
      <div className="home-container slide-in-up">
        <div className="home-header">
          <div className="logo-container bounce-animation">
            <BookOpen className="logo-icon" />
          </div>
          <h1 className="home-title">My Personal Diary</h1>
          <p className="home-subtitle">Capture your thoughts and memories</p>
        </div>

        <div className="home-content glassmorphism">
          <div className="content-header">
            <div className="date-display">
              <Calendar className="date-icon" />
              <span className="date-text">{getCurrentDate()}</span>
            </div>
            <button
              onClick={onNewEntry}
              className="gradient-button new-entry-button"
            >
              <Plus className="button-icon" />
              New Entry
            </button>
          </div>

          {entries.length === 0 ? (
            <div className="empty-state">
              <Heart className="empty-icon bounce-animation" />
              <h3 className="empty-title">No entries yet</h3>
              <p className="empty-subtitle">Start writing your first diary entry!</p>
              <button
                onClick={onNewEntry}
                className="gradient-button start-writing-button"
              >
                <Plus className="button-icon" />
                Start Writing
              </button>
            </div>
          ) : (
            <div className="entries-section">
              <h3 className="entries-title">
                Your Diary Entries ({entries.length})
              </h3>
              <div className="entries-list">
                {entries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className="entry-card glassmorphism-card entry-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="entry-header">
                      <div className="entry-datetime">
                        {entry.fullDateTime}
                      </div>
                      <div className="entry-actions">
                        <button
                          onClick={() => onViewEntry(entry)}
                          className="action-button view"
                          title="View Entry"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => onEditEntry(entry)}
                          className="action-button edit"
                          title="Edit Entry"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(entry.id)}
                          className="action-button delete"
                          title="Delete Entry"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="entry-preview">
                      {entry.preview}
                    </p>
                    <div className="entry-stats">
                      Words: {entry.text.trim().split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content glassmorphism">
              <h3 className="modal-title">Delete Entry</h3>
              <p className="modal-message">
                Are you sure you want to delete this diary entry? This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="nav-button cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="delete-button confirm-delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
