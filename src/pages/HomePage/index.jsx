import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SelectedSeat } from '../../components/SelectedSeat';
import './style.css';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();

  const handleJourneyChange = (selectedJourney) => {
    setJourney(selectedJourney);
  };

  /*const handleBuy = () => {
    console.log('Objednávám.');
  }*/

  const handleBuy = async () => {
    const resp = await fetch(
      "https://apps.kodim.cz/daweb/leviexpress/api/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          seat: journey.autoSeat,
          journeyId: journey.journeyId,
        }),
      }
    );
    if(!resp.ok) {
      alert("Něco se pokazilo");
      return;
    }
    const data = await resp.json();
    const reservation = data.results;
    navigate(`/reservation/${reservation.reservationId}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey && <JourneyDetail journey={journey} />}
      {journey && (
        <>
          <JourneyDetail journey={journey} />
          <SelectedSeat number={journey.autoSeat} />
          <div className="controls container">
            <button className="btn btn--big" type="button" onClick={handleBuy}>
              Rezervovat
            </button>
          </div>
        </>
      )}
    </main>
  );
};
