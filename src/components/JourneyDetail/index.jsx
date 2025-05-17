import { BusStop } from '../BusStop';
import './style.css';

export const JourneyDetail = ({ journey }) => {

return (
<div className="journey-detail container"> 
      <h2>Podrobnosti cesty</h2>
      <div className="stops">
        <BusStop name="Praha" station="ÚAN Florenc" time="15:55" />
          {journey.stops.map((stop) => (
            <BusStop
            key={stop.code}
            name={stop.name}
            station={stop.station}
            time={stop.time}
          />
          ))}
      </div>
    </div>
);
}
