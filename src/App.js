import React, { useState } from 'react';
import MainComponent from './Components/MainComponent';
import Footer from './Components/Footer';

function App() {
  const [carData, setCarData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  const addCarData = (newCarData) => {
    setCarData([...carData, newCarData]);
  };

  const addDriverData = (newDriverData) => {
    setDriverData([...driverData, newDriverData]);
  };

  return (
    <div>
      <MainComponent 
        addCarData={addCarData} 
        carData={carData} 
        addDriverData={addDriverData} 
        driverData={driverData} 
        setDriverData={setDriverData} 
        setCarData={setCarData} 
      />
      <Footer />
    </div>
  );
}

export default App;
