import React from 'react';
import Typography from '@material-ui/core/Typography';

const Location = ({ lat, lon }) => (
    <div>
        <Typography component="h4" gutterBottom>
            Lat: {lat}
        </Typography>
        <Typography component="h4" gutterBottom>
            Long: {lon}
        </Typography>
    </div>
);

export default Location