// App.js
import React, { useState } from 'react';
import './App.css';
import RaceSelector from './components/RaceSelector';
import Standings from './components/Standings';
import { simulateRace } from './components/simulator';



const App = () => {
  const races = [
    { id: 1, name: "Australian Grand Prix", date: "March 16", trackImage: "images/Australia carbon.png" },
    { id: 2, name: "Shanghai International Circuit", date: "March 23", trackImage: "images/China carbon.png" },
    { id: 3, name: "Suzuka Circuit", date: "April 6", trackImage: "images/Japan.avif" },
    { id: 4, name: "Bahrain Grand Prix", date: "April 13", trackImage: "images/Bahrain carbon.avif" },
    { id: 5, name: "Saudi Arabian Grand Prix", date: "April 20" },
    { id: 6, name: "Miami Grand Prix", date: "May 4" },
    { id: 7, name: "Emilia Romagna Grand Prix", date: "May 18" },
    { id: 8, name: "Monaco Grand Prix", date: "May 25" },
    { id: 9, name: "Spanish Grand Prix", date: "June 1" },
    { id: 10, name: "Canadian Grand Prix", date: "June 15" },
    { id: 11, name: "Austrian Grand Prix", date: "June 29" },
    { id: 12, name: "British Grand Prix", date: "July 6" },
    { id: 13, name: "Belgian Grand Prix", date: "July 27" },
    { id: 14, name: "Hungarian Grand Prix", date: "August 3" },
    { id: 15, name: "Dutch Grand Prix", date: "August 31" },
    { id: 16, name: "Italian Grand Prix", date: "September 7" },
    { id: 17, name: "Azerbaijan Grand Prix", date: "September 21" },
    { id: 18, name: "Singapore Grand Prix", date: "October 5" },
    { id: 19, name: "United States Grand Prix", date: "October 19" },
    { id: 20, name: "Mexico City Grand Prix", date: "October 26" },
    { id: 21, name: "São Paulo Grand Prix", date: "November 9" },
    { id: 22, name: "Las Vegas Grand Prix", date: "November 23" },
    { id: 23, name: "Qatar Grand Prix", date: "November 30" },
    { id: 24, name: "Abu Dhabi Grand Prix", date: "December 7" }
  ];

  const [raceResults, setRaceResults] = useState(null);
  const [standings, setStandings] = useState({});

  const handleSelectRace = (race) => {
    const results = simulateRace();
    const newStandings = { ...standings };

    results.forEach((driver) => {
      newStandings[driver.id] = (newStandings[driver.id] || 0) + driver.points;
    });

    setRaceResults(results);
    setStandings(newStandings);
  };

  return (
    <div className="app">
    <header className="app-header">
      <div className="header-container">
        <img src="images/F1_75_Logo.png" alt="F1 Logo" className="logo" />
        <h1 className="f1-title">F1 Results Predictor</h1>
      </div>
    </header>
    <main>
      <RaceSelector races={races} onSelectRace={handleSelectRace} />
      <Standings raceResults={raceResults} />
    </main>
  </div>
);
};

export default App;
