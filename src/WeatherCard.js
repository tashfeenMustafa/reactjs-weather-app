import { React, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateTime from 'datetime-js';
import { Link } from 'react-router-dom';
import './WeatherCard.css';

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
    const [elevation, setElevation] = useState(1);
    const imgId = props.dailyWeather.weather[0].icon;
    const maxTemp = props.dailyWeather.temp.max;
    const minTemp = props.dailyWeather.temp.min; 
    const date = new Date(props.dailyWeather.dt * 1000);
    const day = DateTime(date, '%d %M:s, %D:s');
    const dayParams = DateTime(date, '%D');
    return (
        <>
            <Grid
                item 
                lg={2} md={6} sm={12} xs={12}
            >   
                <Link 
                    onMouseEnter={() => setElevation(elevation + 4)} 
                    onMouseLeave={() => setElevation(elevation - 4)}    
                    to={{
                        pathname: `/${dayParams}`,
                        state: {
                            weatherData: props.dailyWeather
                        }}}
                >
                    <Paper
                        
                        elevation={elevation}
                        className={classes.paper}>
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
                </Link>
            </Grid>
            
        </>
    )
}

export default WeatherCard;