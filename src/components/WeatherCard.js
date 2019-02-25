import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        minWidth: 275,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    pos: {
        marginBottom: 12,
    },
    bold: {
        fontWeight: 700,
    },
};

const WeatherCard = (props) => {
    const { classes } = props;
    const weekDay = format(props.data.dt_txt, 'dddd');
    const { temp, humidity, pressure } = props.data.main;
    const { data } = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    {weekDay}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Temp: <span className={classes.bold}>{temp}</span>&#8451; / Humidity: <span className={classes.bold}>{humidity}</span>% / Pressure: <span className={classes.bold}>{pressure}</span>kPa
                </Typography>
            </CardContent>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    {props.data.weather[0].main}
                </Typography>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    {props.data.weather[0].description}
                </Typography>
            </CardContent>
            <CardActions>
                {/* For some reason this Link doesn't work */}
                <Link to={{
                    pathname: `/details/${props.data.dt}`, state: data
                }}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Details
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

WeatherCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherCard);
