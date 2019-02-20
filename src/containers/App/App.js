import React, { Component } from 'react';
import './App.css';
import Location from '../../components/Location';
import SearchByTown from '../../components/SearchByTown';
import WeatherDays from '../../components/WeatherDays';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import { fetchWeatherDataByCoords } from '../../actions/index';
import { connect } from 'react-redux';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchWeatherDataByCoords());
  }

  render() {
    const { coords: { latitude, longitude } } = this.props.location;
    const { weather } = this.props;

    if (latitude !== 0 && longitude !== 0 && weather.length > 0) {
      return (
        <div className="App">
          <Location lat={latitude} lon={longitude} />
          <SearchByTown />
          <WeatherDays days={weather} />
        </div>
      );
    }

    return (
      <CircularProgress />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    location: state.location,
    weather: state.weather
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(App)));
