import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import * as DateTime from 'datetime-js';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import FlareIcon from '@material-ui/icons/Flare';
import Grid from '@material-ui/core/Grid';

const DailyWeather = (props) => {
    const { day } = useParams();
    const location = useLocation();
    const { weatherData } = location.state;
    console.log(weatherData);

    let dateObj = new Date(weatherData.dt * 1000);
    let date = DateTime(dateObj, '%d %M, %Y');
    let sunriseDateObj = new Date(weatherData.sunrise * 1000);
    let sunriseTime = DateTime(sunriseDateObj, '%H:%i');
    let sunsetDateObj = new Date(weatherData.sunset * 1000);
    let sunsetTime = DateTime(sunsetDateObj, '%H:%i');
    let description = weatherData.weather[0].description;
    let icon = weatherData.weather[0].icon;

    let descriptionFormatter = description
                                .split(' ')
                                .map((word) => word[0].toUpperCase() + word.slice(1))
                                .join(' ');

    return (
        <>
            <Container maxWidth="lg">
                <Link to="/">Go Back</Link>
                <h1>{ day }</h1>
                <h3>{ date }</h3>
                <br />
                <Grid 
                    className="individual-weather-container" 
                    container 
                    spacing={2}
                    direction="row"
                    jusitfy="flex-start"
                    alignItems="center"
                >
                    <Grid
                        item 
                        lg={6}
                    >
                        <h2><WbSunnyIcon /> {sunriseTime} <NightsStayIcon /> {sunsetTime}</h2>
                        <h4>Clouds: {weatherData.clouds}</h4>
                        <h4>Humidity: {weatherData.humidity}</h4>
                        <h4>Gust: {weatherData.gust} km/h</h4>
                        <h4>Pressure: {weatherData.pressure} mb</h4>
                        <h4>Rain: {weatherData.rain} mm</h4>
                        <h4>Speed: {weatherData.speed} km/h</h4>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                    >
                        <div>
                            <h3><FlareIcon /> Temperature: {weatherData.temp.max}&deg;C, {weatherData.temp.min}&deg;C</h3>
                            <div className="img-container">
                                <img src={'http://openweathermap.org/img/wn/' + icon + '@4x.png'} alt=""/>
                            </div>
                            <h3>{descriptionFormatter}</h3>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default DailyWeather;