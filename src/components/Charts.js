import React from 'react';

const Charts = ({ charts }) => {

  const { city, time, temperature, pressure, wind, weather, icon } = charts;

  const weatherIcons = {
    'Clear': "fas fa-sun",
    'Clouds': "fas fa-cloud",
    'Mist': "fas fa-smog",
    'Drizzle': "fas fa-cloud-rain",
    'Rain': "fas fa-cloud-showers-heavy",
    'Snow': "far fa-snowflake",
    'Thunderstorm': "fas fa-bolt"
  }

  function getWeatherIcon(weather) {
    if (weatherIcons.hasOwnProperty(weather)) {
      return <i className={weatherIcons[weather]}></i>;
    } else {
      return <i className="fas fa-cloud"></i>;
    }
  }

  return (
    <div className="charts">

      <div className="main">
        <div className="city chart">
          <h3 className="data">{city}</h3>
        </div>
        <div className="sub">
          <div className="temperature chart">
            <span className="data">{temperature}<span className="unit">&deg;C</span></span>
          </div>
          <div className="weather chart">
            {getWeatherIcon(weather)}
          </div>
        </div>
      </div>

      <div className="other">
        <div className="time chart">
          <span className="tag">Data: </span>
          <span className="data">{time}</span>
        </div>

        <div className="pressure chart">
          <span className="tag">Ciśnienie: </span>
          <span className="data">{pressure}<span className="unit"> hPa</span></span>
        </div>

        <div className="wind chart">
          <span className="tag">Prędkość wiatru: </span>
          <span className="data">{wind}<span className="unit"> m/s</span></span>
        </div>
      </div>

    </div>
  );
}

export default Charts;