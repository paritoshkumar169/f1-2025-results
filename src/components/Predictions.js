import React from 'react';

const Predictions = ({ race, prediction }) => {
  return (
    <div className="predictions">
      <h2>Predicted Results for {race.name}</h2>
      <p><strong>Winner:</strong> {prediction.predictedWinner}</p>
    </div>
  );
};

export default Predictions;
