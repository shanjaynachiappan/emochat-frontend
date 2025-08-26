import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Heart, Edit3, Eye } from 'lucide-react';
import '../styles/DiaryEntry.css';

export default function DiaryEntry({ mode = 'write', entry = null, onBack }) {
  const [currentEntry, setCurrentEntry] = useState(entry?.text || '');
  const [editingId, setEditingId] = useState(entry?.id || null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setCurrentEntry(entry?.text || '');
    setEditingId(entry?.id || null);
  }, [entry]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    if (!currentEntry.trim()) {
      setSaveStatus('Please write something before saving!');
      setTimeout(() => setSaveStatus(''), 2000);
      return;
    }
    const now = new Date();
    const entryData = {
      id: editingId || Date.now(),
      text: currentEntry,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      fullDateTime: getCurrentDateTime(),
      preview: currentEntry.substring(0, 100) + (currentEntry.length > 100 ? '...' : '')
    };
    const existingEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    if (editingId) {
      const updatedEntries = existingEntries.map(entry => entry.id === editingId ? entryData : entry);
      localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      setSaveStatus('Entry updated successfully!');
    } else {
      const newEntries = [entryData, ...existingEntries];
      localStorage.setItem('diaryEntries', JSON.stringify(newEntries));
      setSaveStatus('Entry saved successfully!');
    }
    setTimeout(() => {
      setSaveStatus('');
      if (onBack) onBack();
    }, 1500);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };


  const getPageTitle = () => {
    if (mode === 'view') return 'Viewing Entry';
    if (mode === 'edit') return 'Edit Entry';
    return 'New Entry';
  };

  const getButtonText = () => {
    if (mode === 'edit') return 'Update';
    return 'Save';
  };

  return (
    <div className="diary-app-container">
      <div className="diary-container slide-in-up">
        <div className="diary-header">
          <button
            onClick={handleBack}
            className="nav-button back-button"
          >
            <ArrowLeft className="button-icon" />
            Back
          </button>
          <div className="page-info">
            <h2 className="page-title">{getPageTitle()}</h2>
            <p className="page-date">{getCurrentDate()}</p>
          </div>
          {mode !== 'view' && (
            <button
              onClick={handleSave}
              className="save-button"
            >
              <Save className="button-icon" />
              {getButtonText()}
            </button>
          )}
        </div>
        {saveStatus && (
          <div className="status-container">
            <span className="status-notification">
              {saveStatus}
            </span>
          </div>
        )}
        <div className="diary-content glassmorphism">
          <div className="content-header">
            <div className="diary-greeting">
              {mode === 'view' ? (
                <>
                  <Eye className="greeting-icon" />
                  <span className="greeting-text">Diary Entry</span>
                </>
              ) : (
                <>
                  <Heart className="greeting-icon" />
                  <span className="greeting-text">Dear Diary...</span>
                </>
              )}
            </div>
          </div>
          <div className="entry-container">
            {mode === 'view' ? (
              <div className="entry-display">
                {currentEntry}
              </div>
            ) : (
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="What's on your mind today? Share your thoughts, dreams, and experiences..."
                className="diary-textarea"
              />
            )}
          </div>
          <div className="content-footer">
            <div className="word-count">
              Words: {currentEntry.trim().split(/\s+/).filter(word => word.length > 0).length}
            </div>
            <div className="entry-status">
              {mode === 'view' 
                ? 'Viewing entry' 
                : editingId 
                  ? 'Editing existing entry' 
                  : 'Creating new entry'}
            </div>
          </div>
        </div>
        <div className="quote-section glassmorphism">
          <p className="quote-text">
            {mode === 'view' 
              ? "A diary is more than a repository for one's thoughts; it's a place where the soul can speak freely."
              : "The life of every person is like a diary in which they mean to write one story, and write another. - J.M. Barrie"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
