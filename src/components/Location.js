import React, { Component } from 'react';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0
        };
    }

    componentWillMount() {
        const geolocation = navigator.geolocation;

        new Promise((resolve, reject) => {
            if (!geolocation) {
                reject(new Error('Not Supported'));
            }

            geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                resolve(position);
            }, () => {
                reject(new Error('Permission denied'));
            });
        });
    }

    render() {
        const { latitude, longitude } = this.state;

        return (
            <div>
                <div>Latitude: <span>{latitude}</span></div>
                <div>Longitude: <span>{longitude}</span></div>
            </div>
        );
    }
}

export default Location
