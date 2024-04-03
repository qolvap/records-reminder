import React, { useState } from 'react';

import { addCarToDB } from './FireBase';
import { addDriverToDB } from './FireBase';

import Accordion from 'react-bootstrap/Accordion';
import CarDeadlineReminder from './CarDeadlineReminder';
import DriverDeadlineReminder from './DriverDeadlineReminder';
import SearchNavbar from './SearchBar';

const MainComponent = ({ addCarData, carData, addDriverData, driverData, setDriverData, setCarData }) => {
  const [showCarComponent, setShowCarComponent] = useState(false);
  const [showDriverComponent, setShowDriverComponent] = useState(false);
  const [searchData, setSearchData] = useState('');
  
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

  const filteredCars = carData.filter(car => car.carName.toLowerCase().includes(searchData.toLowerCase()));
  
  const filteredDrivers = driverData.filter(driver => (
    driver.driverFirstName.toLowerCase().includes(searchData.toLowerCase()) ||
    driver.driverSecondName.toLowerCase().includes(searchData.toLowerCase())
  ));

  return (
    <div>      
      <Accordion defaultActiveKey="0" className="m-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={handleCarClick}>Samochody</Accordion.Header>
          {showCarComponent && <CarDeadlineReminder addCarToDB={addCarToDB} addCarData={addCarData} carData={carData} setCarData={setCarData} />}
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={handleDriverClick}>Kierowcy</Accordion.Header>
          {showDriverComponent && <DriverDeadlineReminder addDriverToDB={addDriverToDB} addDriverData={addDriverData} driverData={driverData} setDriverData={setDriverData} />}
        </Accordion.Item>
      </Accordion>
      <SearchNavbar searchData={searchData} setSearchData={setSearchData} filteredCars={filteredCars} filteredDrivers={filteredDrivers} />
    </div>
  );
};

export default MainComponent;