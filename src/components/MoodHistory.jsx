import React from 'react';

const MoodHistory = ({ moodEntries, onDeleteEntry }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (moodEntries.length === 0) {
    return (
      <div className="mood-history">
        <h2>История настроений</h2>
        <p className="empty-message">Записей пока нет. Выберите ваше первое настроение!</p>
      </div>
    );
  }

  return (
    <div className="mood-history">
      <h2>История настроений</h2>
      
      <div className="entries-list">
        {moodEntries.map((entry) => (
          <div key={entry.id} className="mood-entry">
            <div className="entry-header">
              <span className="entry-emoji">{entry.mood.emoji}</span>
              <span className="entry-date">{formatDate(entry.date)}</span>
              <button
                className="delete-button"
                onClick={() => onDeleteEntry(entry.id)}
                title="Удалить запись"
              >
                ×
              </button>
            </div>
            
            <div className="entry-content">
              <span className="mood-label">{entry.mood.label}</span>
              {entry.note && (
                <p className="entry-note">{entry.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;