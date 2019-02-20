import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fetchWeatherByTown } from '../actions/index';
import withRoot from '../withRoot';
import { connect } from 'react-redux'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        maxHeight: 50,
        marginTop: 20
    }
});

class SearchByTown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            town: '',
        }
    }

    handleChange = town => event => {
        this.setState({
            [town]: event.target.value,
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(fetchWeatherByTown(this.state.town));
        this.setState({
            town: '',
        });
    }

    render() {
        const { classes } = this.props;
        const { isValidTown } = this.props;

        if (isValidTown) {
            return (
                <div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="outlined-name"
                            label="Town"
                            className={classes.textField}
                            value={this.state.town}
                            onChange={this.handleChange('town')}
                            margin="normal"
                            variant="outlined"
                        />

                        <Button variant="contained" color="primary" onClick={this.handleClick} className={classes.button}>
                            Search
                        </Button>
                    </form>
                    <h3>Invalid Town Name!!!</h3>
                </div>
            );
        }

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Town"
                        className={classes.textField}
                        value={this.state.town}
                        onChange={this.handleChange('town')}
                        margin="normal"
                        variant="outlined"
                    />

                    <Button variant="contained" color="primary" onClick={this.handleClick} className={classes.button}>
                        Search
                    </Button>
                </form>
            </div>
        );
    }
}

SearchByTown.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        location: state.location,
        weather: state.weather,
        isValidTown: state.isValidTown
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(SearchByTown)));