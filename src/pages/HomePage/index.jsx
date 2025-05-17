import React, { useState } from'react';
import { JourneyPicker } from '../../components/JourneyPicker';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journeyData) => {
    console.log('Data o nalezeném spojení v HomePage' , journeyData)
    setJourney(journeyData);
  };


  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange}/>
      {journey && journey.length > 0 && (
  <div className="journey-result">
  <h3>Nalezené spojení:</h3>
  <p>ID prvního spojení: {journey[0].journeyId}</p>
  {/* Můžeš zde přidat další informace o spojeních */}
  </div>
  )}
    </main>
  );
};
