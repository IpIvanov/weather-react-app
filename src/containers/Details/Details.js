import React from 'react';
import './Details.css';
import format from 'date-fns/format';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper
    },
});

const Details = (props) => {
    const data = props.history.location.state;
    const { grnd_level, humidity, pressure, sea_level, temp, temp_kf, temp_max, temp_min } = data.main;
    const { deg, speed } = data.wind;
    const description = data.weather[0].description;

    return (
        <div className="Details">
            <Typography component="h1" gutterBottom className="Title">
                Detailed information for: {format(data.dt_txt, 'Do of MMMM (dddd)')}
            </Typography>
            <Typography component="h1" gutterBottom>
                Ground level: {grnd_level}m <br />
                Humidity: {humidity}% <br />
                Pressure: {pressure}kPa <br />
                Sea level: {sea_level}m <br />
                Temp: {temp}&#8451; <br />
                Temp_kf: {temp_kf} <br />
                Max Temp for the day: {temp_max}&#8451; <br />
                Min Temp for the day: {temp_min}&#8451;
            </Typography>
            <Typography component="h1" gutterBottom>
                Wind Information: degrees - {deg} / speed - {speed}
            </Typography>
            <Typography component="h1" gutterBottom>
                Short description: {description}
            </Typography>
        </div>
    )
}

export default withRoot(withStyles(styles)(Details));
