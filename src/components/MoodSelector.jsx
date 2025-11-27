import React from 'react';

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  const moods = [
    { emoji: '😊', label: 'Радостный', value: 'happy' },
    { emoji: '😢', label: 'Грустный', value: 'sad' },
    { emoji: '😡', label: 'Злой', value: 'angry' },
    { emoji: '😴', label: 'Сонливый', value: 'tired' },
    { emoji: '😃', label: 'Превосходный', value: 'excited' },
    { emoji: '😌', label: 'Спокойный', value: 'calm' },
    { emoji: '😨', label: 'Тревожный', value: 'anxious' },
    { emoji: '🤩', label: 'Воодушевлённый', value: 'inspired' }
  ];

  const handleMoodClick = (mood) => {
    onMoodSelect(mood);
  };

  return (
    <div className="mood-selector">
      <h2>Как вы себя чувствуете сегодня?</h2>
      
      <div className="moods-grid">
        {moods.map((mood) => (
          <button key={mood.value} className={`mood-button ${selectedMood?.value === mood.value ? 'selected' : ''}`} onClick={() => handleMoodClick(mood)}>
            <span className="emoji">{mood.emoji}</span>
            <span className="label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;