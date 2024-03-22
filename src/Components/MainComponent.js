import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CarDeadlineReminder from './CarDeadlineReminder';
import DriverDeadlineReminder from './DriverDeadlineReminder';

const MainComponent = ({ addCarData, carData, addDriverData, driverData, setDriverData, setCarData }) => {
  const [showCarComponent, setShowCarComponent] = useState(false);
  const [showDriverComponent, setShowDriverComponent] = useState(false);

  const handleCarClick = () => {
    if (showCarComponent) {
      setShowCarComponent(false);
    } else {
      setShowCarComponent(true);
      setShowDriverComponent(false);
    }
  };

  const handleDriverClick = () => {
    if (showDriverComponent) {
      setShowDriverComponent(false);
    } else {
      setShowCarComponent(false);
      setShowDriverComponent(true);
    }
  };

  return (
    <Accordion defaultActiveKey="0">
     <Accordion.Item eventKey="0">
      <Accordion.Header onClick={handleCarClick}>Samochody</Accordion.Header>
      {showCarComponent && <CarDeadlineReminder addCarData={addCarData} carData={carData} setCarData={setCarData} />}
      </Accordion.Item>
      <Accordion.Item eventKey="1">
      <Accordion.Header onClick={handleDriverClick}>Kierowcy</Accordion.Header>
      {showDriverComponent && <DriverDeadlineReminder addDriverData={addDriverData} driverData={driverData} setDriverData={setDriverData} />}
    </Accordion.Item>
    </Accordion>
  );
};

export default MainComponent;
