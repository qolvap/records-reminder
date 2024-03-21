// MainComponent.js
import React, { useState } from 'react';
import CarDeadlineReminder from './CarDeadlineReminder';
import DriverDeadlineReminder from './DriverDeadlineReminder';

const MainComponent = ({ addCarData, carData, addDriverData, driverData, setDriverData, setCarData }) => {
  const [showCarComponent, setShowCarComponent] = useState(false);
  const [showDriverComponent, setShowDriverComponent] = useState(false);

  const handleCarClick = () => {
    setShowCarComponent(true);
    setShowDriverComponent(false);
  };

  const handleDriverClick = () => {
    setShowCarComponent(false);
    setShowDriverComponent(true);
  };

  return (
    <div className="main-container">
      <div className="half-container" onClick={handleCarClick}>
        <h2>Samochody</h2>
      </div>
      <div className="half-container" onClick={handleDriverClick}>
        <h2>Kierowcy</h2>
      </div>
      {showCarComponent && <CarDeadlineReminder addCarData={addCarData} carData={carData} setCarData={setCarData} />}
      {showDriverComponent && <DriverDeadlineReminder addDriverData={addDriverData} driverData={driverData} setDriverData={setDriverData} />}
    </div>
  );
};

export default MainComponent;
