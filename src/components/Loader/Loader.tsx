import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      data-testid="loader-container"
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
