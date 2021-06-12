import React from 'react';
import WeatherCard from './WeatherCard.js';
import './WeatherContainer.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}))

const WeatherContainer = (props) => {
    const classes = useStyles();

    let weatherList = props.weather.map((day, index) => {
        return (
            <WeatherCard key={index} dailyWeather={day} />
        )
    })

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid 
                    className="weather-container" 
                    container 
                    spacing={2}
                    direction="row"
                    jusitfy="flex-start"
                    alignItems="center"
                >
                    {weatherList}
                </Grid>
            </Container>
            
        </div>
    )
}

export default WeatherContainer;