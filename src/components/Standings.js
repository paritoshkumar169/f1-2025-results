import React, { useState } from 'react';

const Standings = ({ raceResults }) => {
  const [sortBy, setSortBy] = useState('position');
  const [sortOrder, setSortOrder] = useState('asc');

  if (!raceResults) {
    return (
      <div className="standings">
        <h2>Select a race to see results</h2>
      </div>
    );
  }

  const sortedStandings = [...raceResults].sort((a, b) => {
    if (sortBy === 'position') {
      return sortOrder === 'asc' ? a.position - b.position : b.position - a.position;
    }
    if (sortBy === 'driver') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    if (sortBy === 'team') {
      return sortOrder === 'asc' 
        ? a.team.localeCompare(b.team) 
        : b.team.localeCompare(a.team);
    }
    if (sortBy === 'points') {
      return sortOrder === 'asc' ? a.points - b.points : b.points - a.points;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="standings">
      <h2>Race Standings</h2>
      <table className="standings-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('position')}>
              Pos{getSortIndicator('position')}
            </th>
            <th onClick={() => handleSort('driver')}>
              Driver{getSortIndicator('driver')}
            </th>
            <th onClick={() => handleSort('team')}>
              Team{getSortIndicator('team')}
            </th>
            <th onClick={() => handleSort('points')}>
              Points{getSortIndicator('points')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((driver) => (
            <tr key={driver.position}>
              <td>{driver.position}</td>
              <td>{driver.name}</td>
              <td>{driver.team.replace(/([A-Z])/g, ' $1').trim()}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
