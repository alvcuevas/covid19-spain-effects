import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = ({ color }) => (
    <Loader
        type="ThreeDots"
        color={color}
        height={100}
        width={100}
        timeout={3000}
    />
);

export default Spinner;
