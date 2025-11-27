import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import MoodStats from './components/MoodStats';
import { saveToStorage, loadFromStorage, clearStorage } from './utils/storage';
import './styles/App.css';

function App() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData && savedData.moodEntries) {
      setMoodEntries(savedData.moodEntries);
    }
  }, []);

  useEffect(() => {
    saveToStorage({ moodEntries });
  }, [moodEntries]);

  const handleMoodSelect = (mood) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood
    };

    setMoodEntries(prev => [newEntry, ...prev]);
    setSelectedMood(mood);

    setTimeout(() => {
      setSelectedMood(null);
    }, 2000);
  };

  const handleClearAll = () => {
    setMoodEntries([]);
    clearStorage();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Дневник настроения</h1>
      </header>

      <div className="app-content">
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        <MoodStats moodEntries={moodEntries} />
      </div>

      {moodEntries.length > 0 && (
        <button className="clear-button" onClick={handleClearAll}>Удалить все записи</button>
      )}
    </div>
  );
}

export default App;