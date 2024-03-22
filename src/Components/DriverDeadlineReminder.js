import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const DriverDeadlineReminder = ({ addDriverData, driverData, setDriverData }) => {
  const [driverFirstName, setDriverFirstName] = useState('');
  const [driverSecondName, setDriverSecondName] = useState('');
  const [cardDate, setCardDate] = useState('');
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
      }, 15000); // 15 seconds
    }

    return () => clearTimeout(timeout);
  }, [alertVariant, alertMessage]);

  const calculateDeadline = () => {
    if (!driverFirstName || !driverSecondName || !cardDate) {
      setAlertVariant('warning');
      setAlertMessage('Najpierw wprowadź wszystkie informacje');
      setShowAlert(true);
      return;
    }

    const inputDate = new Date(cardDate);
    const deadlineDate = new Date(inputDate.getTime());
    deadlineDate.setDate(deadlineDate.getDate() + 28);

    const newDriverData = {
      id: driverData.length + 1,
      driverFirstName,
      driverSecondName,
      cardDate: inputDate,
      deadlineDate
    };

    addDriverData(newDriverData);

    setDriverFirstName('');
    setDriverSecondName('');
    setCardDate('');

    setAlertVariant('info');
    setAlertMessage(`Następny termin sczytania karty ${driverFirstName} ${driverSecondName} to: ${deadlineDate.toLocaleDateString()}`);
    setShowAlert(true);
  };

  const editDriverData = (id) => {
    setEditingId(id);
    const driver = driverData.find(data => data.id === id);
    if (driver) {
      setDriverFirstName(driver.driverFirstName);
      setDriverSecondName(driver.driverSecondName);
      setCardDate(driver.cardDate.toISOString().split('T')[0]);
    }
  };

  const updateDriverData = () => {
    const updatedDriverData = driverData.map(data => {
      if (data.id === editingId) {
        const inputDate = new Date(cardDate);
        const deadlineDate = new Date(inputDate.getTime());
        deadlineDate.setDate(deadlineDate.getDate() + 28);

        return {
          ...data,
          driverFirstName,
          driverSecondName,
          cardDate: inputDate,
          deadlineDate
        };
      }
      return data;
    });
    
    setDriverData(updatedDriverData);
    
    setDriverFirstName('');
    setDriverSecondName('');
    setCardDate('');
    setEditingId(null);
  };

  const deleteDriverData = (id) => {
    const updatedDriverData = driverData.filter(data => data.id !== id);
    setDriverData(updatedDriverData);
  };

  return (
    <div className="container">
      <h2>Terminy sczytania kart kierowców</h2>
      {showAlert && alertVariant && alertMessage && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <input type="text" value={driverFirstName} onChange={(e) => setDriverFirstName(e.target.value)} placeholder="Imię kierowcy" />
      <input type="text" value={driverSecondName} onChange={(e) => setDriverSecondName(e.target.value)} placeholder="Nazwisko kierowcy" />
      <input type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} placeholder="Wybierz datę" />
      <Button variant="primary" onClick={calculateDeadline}>Policz</Button>

      <h3>Karty kierowców:</h3>
      <Card body>
        {driverData.map((data) => {
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
          const progressBarNow = Math.floor((daysLeft / 28) * 100);
          return (
            <li key={data.id}>
              {editingId === data.id ? (
                <>
                  <input type="text" value={driverFirstName} onChange={(e) => setDriverFirstName(e.target.value)} placeholder="Imię kierowcy" />
                  <input type="text" value={driverSecondName} onChange={(e) => setDriverSecondName(e.target.value)} placeholder="Nazwisko kierowcy" />
                  <input type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} placeholder="Wybierz datę" />
                  <Button variant="primary" onClick={() => updateDriverData(data.id)}>Zapisz</Button>
                </>
              ) : (
                <>
                  <p>Kierowca: {data.driverFirstName} {data.driverSecondName}</p>
                  <p>Data ostatniego pobrania karty: <Badge bg="secondary">{data.cardDate.toLocaleDateString()}</Badge></p>
                  <p>Data kolejnego pobrania karty: <Badge bg="warning" text="dark">{data.deadlineDate.toLocaleDateString()}</Badge></p>
                  <p>Dni pozostało: {daysLeft}/{28}</p>
                  {daysLeft <= 0 && <p><Badge bg="danger" text="dark">Termin wygasł</Badge></p>}
                  {daysLeft > 0 && (
                    <>
                      <ProgressBar now={progressBarNow} variant={progressBarVariant || "primary"} label={`${daysLeft} dni`} />
                    </>
                  )}
                  <Button variant="outline-warning" onClick={() => editDriverData(data.id)}>Zmień</Button>
                  <Button variant="outline-danger" onClick={() => deleteDriverData(data.id)}>Usuń</Button>
                </>
              )}
            </li>
          );
        })}
        </Card>
    </div>
  );
};

export default DriverDeadlineReminder;
