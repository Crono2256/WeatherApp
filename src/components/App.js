import React from 'react';
import SearchTab from './SearchTab';
import Charts from './Charts'
import '../App.css';

const APIKey = '16ed9761819e51f4a5ecad833971e589';

class App extends React.Component {

  state = {
    search: '',
    charts: {
      city: '',
      country: '',
      time: '',
      temperature: '',
      pressure: '',
      wind: '',
      weather: '',
      icon: ''
    }
  }

  handleInputChange = (e) => {

    const search = e.target.value;

    this.setState({
      search
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
  }

  handleDataFetch = () => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.search}&appid=${APIKey}&units=metric`)
      .then(res => {
        // console.log(res)
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
        // const country = this.getCountryName(data.sys.country)

        this.setState({
          charts: {
            city: data.name,
            // country,
            time: date,
            temperature: Math.round(data.main.temp),
            pressure: data.main.pressure,
            wind: data.wind.speed,
            weather: data.weather[0].main,
            icon: data.weather[0].icon
          }
        })
      })
      .catch(err => console.log('Błąd podczas pobierania danych. ' + err))
  }

  render() {

    const appStyle = {
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/blue-sky.jpg`
    }

    return (
      <div className="App" style={appStyle}>
        {/* <h2 className="name">Pogoda na już</h2> */}
        <SearchTab search={this.state.search} change={this.handleInputChange} click={this.handleDataFetch} submit={this.handleFormSubmit} />
        <Charts charts={this.state.charts} />
      </div>
    )
  };
}

export default App;
