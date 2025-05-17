import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ cities }) => (
  <>
    {cities.map((city) => (
      <option key={city.code} value={city.code}>
        {city.name}
      </option>
    ))}
  </>
);

const DateOptions = ({ dates }) =>
  dates.map((date) => (
    <option key={date.dateBasic} value={date.dateBasic}>
      {date.dateCs}
    </option>
  ));

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const resp = await fetch(
          'https://apps.kodim.cz/daweb/leviexpress/api/cities',
        );
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        setCities(data.results); // Předpokládám, že API vrací rovnou pole měst
      } catch (error) {
        console.error('Chyba při načítání měst:', error);
        // zpráva o chybě
      }
    };

    const fetchDates = async () => {
      try {
        const resp = await fetch(
          'https://apps.kodim.cz/daweb/leviexpress/api/dates',
        );
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        setDates(data.results);
        console.log(data)
      } catch (error) {
        console.error('Chyba při načítání termínů:', error);
      }
    };

    fetchCities();
    fetchDates();
  }, []);

  /*const handleSubmit = (event) => {
    event.preventDefault();
    const journeyData = {
      fromCity: fromCity,
      toCity: toCity,
      date: date,
    };
    console.log(
      `Uživatel chce objednt jízdenku z ${fromCity} do ${toCity} na ${data}.`,
    );
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fromCity || !toCity || !date) {
      return;
    }
    const apiURL = `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Nalezená spojení:', data);
      // Volání onJourneyChange bude přidáno později
    } catch (error) {
      console.error('Chyba při vyhledávání spojení:', error);
      // Zde by se mohlo implementovat uživatelské upozornění na chybu
    }
  };
  


return (
  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form className="journey-picker__form" onSubmit={handleSubmit}>
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select
            value={fromCity}
            onChange={(event) => setFromCity(event.target.value)}
          >
            <CityOptions cities={cities} />
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select
            value={toCity}
            onChange={(event) => setToCity(event.target.value)}
          >
            <CityOptions cities={cities} />
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select
            value={date}
            onChange={(event) => setDate(event.target.value)}
          >
            <DateOptions dates={dates} />
          </select>
        </label>
        <div className="journey-picker__controls">
          <button className="btn" type="submit" disabled={!fromCity || !toCity || !date}>
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src="/map.svg" alt="Mapa" />
    </div>
  </div>
);
};
