import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as DateTime from 'datetime-js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}))

function WeatherCard (props) {
    const classes = useStyles();
    const imgId = props.dailyWeather.weather[0].icon;
    const maxTemp = props.dailyWeather.temp.max;
    const minTemp = props.dailyWeather.temp.min; 
    const date = new Date(props.dailyWeather.dt * 1000);
    const day = DateTime(date, '%d %M:s, %D:s');
    return (
        <>
            <Grid
                item 
                lg={2}
            >
                <Paper className={classes.paper}>
                    <div className="day">
                        <h3>{day}</h3>
                    </div>
                    <div className="img-container">
                        <img src={'http://openweathermap.org/img/wn/' + imgId + '@2x.png'} alt=""/>
                    </div>
                    <div className="minMaxTemp">
                        <p><span className="maxTemp">{maxTemp}</span> <span className="minTemp">{minTemp}</span></p>
                    </div>
                </Paper>
            </Grid>
        </>
    )
}

export default WeatherCard;