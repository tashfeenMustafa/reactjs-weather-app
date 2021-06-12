import React from "react";
import './App.css';
import API_KEY from './api.js';
import axios from 'axios';
import WeatherContainer from './WeatherContainer.js';
import { Route, Switch } from 'react-router-dom';
import DailyWeather from "./DailyWeather";

let setReverseGeocodeURI = (latitude, longitude) => {
  return 'https://api.openweathermap.org/geo/1.0/reverse?lat=' + latitude + '&lon=' + longitude + '&limit=5&appid=' + API_KEY;
}

/*let setForecastURI = (latitude, longitude) => {
  return 'https://api.openweathermap.org/data/2.5/forecast/hourly?lat=' + latitude + '&lon=' + longitude + '&cnt=6&units=metric&appid=' + API_KEY;
}*/

let setForecastURIWithCityName = (cityName) => {
  return 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + '&cnt=6&units=metric&appid=' + API_KEY;
}

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      cityName: '',
      forecast: {}
    }
    this.setCityName = this.setCityName.bind(this);
    this.setForecast = this.setForecast.bind(this);
  }
  
  setCityName(latitude, longitude) {
    axios.get(setReverseGeocodeURI(latitude, longitude))
    .then((response) => {
      this.setState({
        cityName: response.data[1].name
      });
      this.setForecast(this.state.cityName);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  setForecast(cityName) {
    axios.get(setForecastURIWithCityName(cityName))
    .then((response) => {
      this.setState({
        forecast: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount () {
    const deviceLocation = navigator.geolocation;

    if (!deviceLocation) {
      window.alert('GeoLocation is not supported on your device.');
    }
    else {
      deviceLocation.getCurrentPosition(
        (position) => {
          this.setCityName(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.log(error)
      );
    }
  }

  render () {
    let cityName = this.state.cityName;
    let forecast = this.state.forecast;
    let weatherContainer = forecast.list ? <WeatherContainer weather={forecast.list} /> : null;

    return (
      <div>
        <header className="header">
          <h1>ReactJS Weather App</h1>
          {
            cityName && 
            <p>You are at {cityName}.</p>
          }
        </header>
        
        <footer>
          <p>Created by <a href="https://linkedin">Tashfeen Mustafa Choudhury</a></p>
        </footer>

        <Switch>
          <Route exact path="/">
            {weatherContainer}
          </Route>
          <Route path="/:day">
                <DailyWeather />
            </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
