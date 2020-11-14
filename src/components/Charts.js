import React from 'react';

const Charts = ({ charts }) => {

  const { city, country, time, temperature, pressure, wind, weather, icon } = charts;

  const weatherWords = {
    'Clear': 'Słonecznie',
    'Clouds': 'Zachmurzenie',
    'Mist': 'Mgła',
    'Rain': 'Deszcz',
    'Snow': 'Śnieg'
  }

  function translateWeather(weather) {
    if (weatherWords.hasOwnProperty(weather)) {
      return weatherWords[weather];
    } else {
      return weather;
    }
  }

  return (
    <div className="charts">
      <div className="city chart">
        <span className="tag">Miasto: </span>
        <span className="data">{city}</span>
      </div>
      {/* <div className="country">
        <span className="tag">: </span>
        <span className="data">{country}</span>
      </div> */}
      <div className="time chart">
        <span className="tag">Data: </span>
        <span className="data">{time}</span>
      </div>
      <div className="temperature chart">
        <span className="tag">Temperatura: </span>
        <span className="data">{temperature}{temperature && <span className="unit">&deg;C</span>}</span>
      </div>
      <div className="pressure chart">
        <span className="tag">Ciśnienie: </span>
        <span className="data">{pressure}{pressure && <span className="unit"> hPa</span>}</span>
      </div>
      <div className="wind chart">
        <span className="tag">Prędkość wiatru: </span>
        <span className="data">{wind}{wind && <span className="unit"> m/s</span>}</span>
      </div>
      <div className="weather chart">
        <span className="tag">Pogoda: </span>
        <span className="data">{translateWeather(weather)}{weather && <img className="icon" src={"http://openweathermap.org/img/w/" + icon + ".png"} alt="weather icon" />}</span>
      </div>
    </div>
  );
}

export default Charts;