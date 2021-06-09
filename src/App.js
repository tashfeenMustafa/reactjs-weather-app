import React from "react";
import './App.css';

let getLocationSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude, longitude);
}

let getLocationError = (error) => {
  console.log(error);
}

class App extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      }
    }
  }
  componentDidMount () {
    const deviceLocation = navigator.geolocation;

    if (!deviceLocation) {
      window.alert('GeoLocation is not supported on your device.');
    }
    else {
      deviceLocation.getCurrentPosition(getLocationSuccess, getLocationError);
    }
  }
  render () {
    return (
      <div>
        <header className="header">
          <h1>ReactJS Weather App</h1>
        </header>
      </div>
    );
  }
}

export default App;
