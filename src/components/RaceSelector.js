import React from 'react';
import './RaceSelector.css'; // Import the CSS file

const RaceSelector = ({ races, onSelectRace }) => {
  const [selectedRace, setSelectedRace] = React.useState(null);

  const handleSelectRace = (e) => {
    const raceId = parseInt(e.target.value, 10);
    const race = races.find((race) => race.id === raceId);
    setSelectedRace(race);
    onSelectRace(race);
  };

  return (
    <div className="race-selector">
      <div className="header">
        <h2>Select a Race</h2>
      </div>
      <select
        id="race"
        className="race-dropdown"
        onChange={handleSelectRace}
      >
        <option value="">-- Choose a Race --</option>
        {races.map((race) => (
          <option key={race.id} value={race.id}>
            {race.name} - {race.date}
          </option>
        ))}
      </select>
      {selectedRace && (
        <div className="track-preview">
          <img
            src={selectedRace.trackImage}
            alt={`${selectedRace.name} Track`}
            className="track-image"
          />
        </div>
      )}
    </div>
  );
};

export default RaceSelector;
