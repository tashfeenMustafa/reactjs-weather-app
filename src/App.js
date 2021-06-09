import React from "react";
import './App.css';
import API_KEY from './api.js';
import axios from 'axios';

let setReverseGeocodeURI = (latitude, longitude) => {
  return 'https://api.openweathermap.org/geo/1.0/reverse?lat=' + latitude + '&lon=' + longitude + '&limit=5&appid=' + API_KEY;
}

let setForecastURI = (cityName) => {
  return 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + '&mode=json&units=metric&cnt=7&appid=' + API_KEY;
}

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      cityName: '',
      forecast: {},
    }
    this.setCityName = this.setCityName.bind(this);
    this.setForecast = this.setForecast.bind(this);
  }
  
  setCityName(reverseGeoCodeURI) {
    axios.get(reverseGeoCodeURI)
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
    axios.get(setForecastURI(cityName))
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
          this.setCityName(setReverseGeocodeURI(position.coords.latitude, position.coords.longitude))
        },
        (error) => console.log(error)
      );
    }
  }

  render () {
    let cityName = this.state.cityName;

    return (
      <div>
        <header className="header">
          <h1>ReactJS Weather App</h1>
          <h2>You are at {cityName}.</h2>
        </header>
      </div>
    );
  }
}

export default App;
