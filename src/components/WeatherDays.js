import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherDays = (props) => {
    const { days } = props;

    return (
        <div>
            {days.map((item, index) => {
                return (<WeatherCard key={index} data={item} />)
            })}
        </div>
    );
};

export default WeatherDays