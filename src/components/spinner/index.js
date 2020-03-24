import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => (
  <Loader
    type="ThreeDots"
    color="#8884d8"
    height={150}
    width={150}
    timeout={3000}
  />
);

export default Spinner;
