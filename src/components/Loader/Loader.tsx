import React from 'react';
import './Loader.css'; 

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;