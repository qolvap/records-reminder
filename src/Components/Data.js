import React, { useState } from 'react';
import DriverDeadlineReminder from './DriverDeadlineReminder';
import CarDeadlineReminder from './CarDeadlineReminder';

const Data = () => {
  const [driverData, setDriverData] = useState([]);
  const [carData, setCarData] = useState([]);

  const addDriverData = (newDriverData) => {
    setDriverData([...driverData, newDriverData]);
  };

  const addCarData = (newCarData) => {
    setCarData([...carData, newCarData]);
  };

  return (
    <div>
      <DriverDeadlineReminder addDriverData={addDriverData} />
      <CarDeadlineReminder addCarData={addCarData} />

      <h2>Driver Data:</h2>
      <ul>
        {driverData.map((data, index) => (
          <li key={index}>{JSON.stringify(data)}</li>
        ))}
      </ul>

      <h2>Car Data:</h2>
      <ul>
        {carData.map((data, index) => (
          <li key={index}>{JSON.stringify(data)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
