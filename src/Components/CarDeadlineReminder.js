import React, { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { PlusSquare } from 'react-bootstrap-icons';
import { CheckSquareFill } from 'react-bootstrap-icons'; 
import { Trash } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons'; 

const CarDeadlineReminder = ({ addCarData, carData, setCarData }) => {
  const [carName, setCarName] = useState('');
  const [carDate, setCarDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    let timeout;
    if (alertVariant && alertMessage) {
      timeout = setTimeout(() => {
        setShowAlert(false);
        setAlertVariant(null);
        setAlertMessage('');
      }, 15000); 
    }

    return () => clearTimeout(timeout);
  }, [alertVariant, alertMessage]);

  const calculateDeadline = () => {
    if (!carName || !carDate) {
      setAlertVariant('warning');
      setAlertMessage('Najpierw wprowadź wszystkie informacje');
      setShowAlert(true);
      return;
    }

    const inputDate = new Date(carDate);
    const deadlineDate = new Date(inputDate.getTime());
    deadlineDate.setDate(deadlineDate.getDate() + 90);

    const newCarData = {
      id: carData.length + 1,
      carName,
      carDate: inputDate,
      deadlineDate
    };

    addCarData(newCarData);

    setCarName('');
    setCarDate('');

    setAlertVariant('info');
    setAlertMessage(`Następny termin sczytania samochodu ${carName} to: ${deadlineDate.toLocaleDateString()}`);
    setShowAlert(true);
  };

  const editCarData = (id) => {
    setEditingId(id);
    const car = carData.find(data => data.id === id);
    if (car) {
      setCarName(car.carName);
      setCarDate(car.carDate.toISOString().split('T')[0]);
    }
  };

  const updateCarData = () => {
    const updatedCarData = carData.map(data => {
      if (data.id === editingId) {
        const inputDate = new Date(carDate);
        const deadlineDate = new Date(inputDate.getTime());
        deadlineDate.setDate(deadlineDate.getDate() + 90);

        return {
          ...data,
          carName,
          carDate: inputDate,
          deadlineDate
        };
      }
      return data;
    });
    
    setCarData(updatedCarData);
    
    setCarName('');
    setCarDate('');
    setEditingId(null);
  };

  const deleteCarData = (id) => {
    const updatedCarData = carData.filter(data => data.id !== id);
    setCarData(updatedCarData);
  };

  return (
    <div className="container">
      <h2>Terminy sczytania samochodów</h2>
      {showAlert && alertVariant && alertMessage && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <InputGroup className="mb-3">
        <Form.Control type="text" className="form-control" value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="Nr rejestracyjny" />
        <Form.Control type="date" className="form-control" value={carDate} onChange={(e) => setCarDate(e.target.value)} placeholder="Wybierz datę" />
        <Button className="ml-2" variant="primary" onClick={calculateDeadline}><PlusSquare /></Button>
      </InputGroup>
      {carData.length > 0 && <h3>Tachografy:</h3>} 
      {carData.map((data) => {
        let daysLeft = Math.ceil((data.deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
        if (daysLeft < 0) {
          daysLeft = 0;
        }
        let progressBarVariant = '';
        if (daysLeft <= 5) {
          progressBarVariant = 'warning';
        } else if (daysLeft === 0) {
          progressBarVariant = 'danger';
        }
        const progressBarNow = Math.floor((daysLeft / 90) * 100);
        return (
          <li key={data.id} style={{ listStyleType: 'none' }}>
            {editingId === data.id ? (
              <>
                <InputGroup className="mb-3">
                  <Form.Control type="text" className="form-control" value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="Nr rejestracyjny" />
                  <Form.Control type="date" className="form-control" value={carDate} onChange={(e) => setCarDate(e.target.value)} placeholder="Wybierz datę" />
                  <Button variant="primary" onClick={() => updateCarData(data.id)}><CheckSquareFill /></Button>
                </InputGroup>
              </>
            ) : (
              <>
                <Card body className="shadow p-3 mb-5 bg-white rounded">
                  <p>Numer rejestracyjny: {data.carName}</p>
                  <p>Data ostatniego sczytania samochodu: <Badge bg="secondary">{data.carDate.toLocaleDateString()}</Badge></p>
                  <p>Data kolejnego sczytania samochodu: <Badge bg="warning" text="dark">{data.deadlineDate.toLocaleDateString()}</Badge></p>
                  <p>Dni pozostało: {daysLeft}/{90}</p>
                  {daysLeft <= 0 && <p><Badge bg="danger" text="dark">Termin wygasł</Badge></p>}
                  {daysLeft > 0 && (
                    <>
                      <ProgressBar now={progressBarNow} variant={progressBarVariant || "primary"} label={`${daysLeft} dni`} />
                    </>
                  )}
                  <ButtonGroup>
                    <Button className="mt-2" variant="outline-warning" onClick={() => editCarData(data.id)}><PencilSquare /></Button>
                    <Button className="mt-2" variant="outline-danger" onClick={() => deleteCarData(data.id)}><Trash/></Button>
                  </ButtonGroup>
                </Card>
              </>
            )}
          </li>
        );
      })}
    </div>
  );
};

export default CarDeadlineReminder;
