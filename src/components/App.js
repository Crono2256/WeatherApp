import React from 'react';
import SearchTab from './SearchTab';
import Charts from './Charts'
import '../App.css';

const APIKey = '16ed9761819e51f4a5ecad833971e589';

class App extends React.Component {

  state = {
    search: 'Ostróda',
    activeItem: 'main',
    charts: {
      city: '',
      country: '',
      time: '',
      temperature: '',
      pressure: '',
      wind: '',
      weather: '',
    },
    error: ''
  }

  handleInputChange = (e) => {

    const search = e.target.value;

    this.setState({
      search
    })

  }

  handleButtonClick = (e) => {
    this.setState({
      activeItem: 'search'
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
  }

  handleSearchConfirm = () => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&appid=${APIKey}&units=metric`)
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw Error(res.status)
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data)
        const time = new Date();
        const timeStr = time.toISOString();
        const date = timeStr.substr(0, 10) + ' ' + timeStr.substr(11, 5);
        let weather = data.weather[0].main;

        if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(weather)) weather = 'Mist'

        this.setState({
          charts: {
            city: data.name,
            time: date,
            temperature: Math.round(data.main.temp),
            pressure: data.main.pressure,
            wind: data.wind.speed,
            weather,
          },
          activeItem: 'main',
          error: null,
        })
      })
      .catch(err => {
        console.log('Błąd podczas pobierania danych. ' + err);

        this.setState({
          error: err
        })
      })

  }

  componentDidMount() {
    this.handleSearchConfirm()
  }

  render() {

    const weather = this.state.charts.weather;

    const weatherBackgrounds = {
      'Clear': "blue-sky.jpg",
      'Clouds': "clouds.jpg",
      'Mist': "mist.jpg",
      'Drizzle': 'drizzle.jpg',
      'Rain': "rain.jpeg",
      'Snow': "snow.jpg",
      'Thunderstorm': 'storm.jpg'
    }

    function getWeatherBackground(weather) {
      console.log('bg change')
      if (weatherBackgrounds.hasOwnProperty(weather)) {
        return weatherBackgrounds[weather];
      } else {
        return "blue-sky.jpg";
      }
    }

    const appStyle = {
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/${getWeatherBackground(weather)}`,
    }

    const activeItem = this.state.activeItem;

    return (
      <div className="App" style={appStyle}>
        <div className="colorFade">
          {activeItem === 'search' && <SearchTab search={this.state.search} error={this.state.error} change={this.handleInputChange} click={this.handleSearchConfirm} submit={this.handleFormSubmit} />}
          {activeItem === 'main' && <div className="wrap">
            <button className="showSearch" onClick={this.handleButtonClick}><i className="fas fa-search"></i></button>
            <Charts charts={this.state.charts} />
          </div>}
        </div>
      </div>
    )
  };
}

export default App;
