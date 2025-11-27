import React from 'react';

const MoodStats = ({ moodEntries }) => {
  const getMoodStats = () => {
    if (moodEntries.length === 0) {
      return null;
    }

    const moodCounts = {};
    moodEntries.forEach(entry => {
      const moodValue = entry.mood.value;
      moodCounts[moodValue] = (moodCounts[moodValue] || 0) + 1;
    });

    const totalEntries = moodEntries.length;
    const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
      mood: moodEntries.find(e => e.mood.value === mood).mood,
      count,
      percentage: ((count / totalEntries) * 100).toFixed(1)
    }));

    moodPercentages.sort((a, b) => b.count - a.count);

    return {
      totalEntries,
      moodPercentages,
      mostCommonMood: moodPercentages[0]
    };
  };

  const stats = getMoodStats();

  if (!stats) {
    return (
      <div className="mood-stats">
        <h2>Статистика настроений</h2>
      </div>
    );
  }

  return (
    <div className="mood-stats">
      <h2>Статистика настроений</h2>
      
      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-number">{stats.totalEntries}</span>
          <span className="stat-label">Всего записей</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-emoji">{stats.mostCommonMood.mood.emoji}</span>
          <span className="stat-label">Чаще всего</span>
        </div>
      </div>

      <div className="mood-distribution">
        <h3>Распределение настроений</h3>
        {stats.moodPercentages.map(({ mood, count, percentage }) => (
          <div key={mood.value} className="distribution-item">
            <div className="mood-info">
              <span className="emoji">{mood.emoji}</span>
              <span className="label">{mood.label}</span>
            </div>
            
            <div className="distribution-bar">
              <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            
            <div className="distribution-numbers">
              <span className="count">{count}</span>
              <span className="percentage">({percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodStats; 