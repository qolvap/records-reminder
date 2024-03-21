import React, { useState } from 'react';

const DriverDeadlineReminder = ({ addDriverData, driverData, setDriverData }) => {
    const [driverFirstName, setDriverFirstName] = useState('');
    const [driverSecondName, setDriverSecondName] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [editingId, setEditingId] = useState(null);

  const calculateDeadline = () => {
    if (!driverFirstName || !driverSecondName || !cardDate) {
      alert('Najpierw wprowadź wszystkie informacje');
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

    alert(`Następny termin sczytania karty ${driverFirstName} ${driverSecondName} to: ${deadlineDate.toLocaleDateString()}`);
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
        return {
          ...data,
          driverFirstName,
          driverSecondName,
          cardDate: new Date(cardDate),
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
      <input type="text" value={driverFirstName} onChange={(e) => setDriverFirstName(e.target.value)} placeholder="Imię kierowcy" />
      <input type="text" value={driverSecondName} onChange={(e) => setDriverSecondName(e.target.value)} placeholder="Nazwisko kierowcy" />
      <input type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} placeholder="Wybierz datę" />
      <button onClick={calculateDeadline}>Policz</button>

      <h3>Karty kierowców:</h3>
      <ul>
        {driverData.map((data) => (
          <li key={data.id}>
            {editingId === data.id ? (
              <>
                <input type="text" value={driverFirstName} onChange={(e) => setDriverFirstName(e.target.value)} placeholder="Imię kierowcy" />
                <input type="text" value={driverSecondName} onChange={(e) => setDriverSecondName(e.target.value)} placeholder="Nazwisko kierowcy" />
                <input type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} placeholder="Wybierz datę" />
                <button onClick={() => updateDriverData(data.id)}>Zapisz</button>
              </>
            ) : (
              <>
                <p>Kierowca: {data.driverFirstName} {data.driverSecondName}</p>
                <p>Data ostatniego sczytania karty: {data.cardDate.toLocaleDateString()}</p>
                <p>Data kolejnego sczytania karty: {data.deadlineDate.toLocaleDateString()}</p>
                <button onClick={() => editDriverData(data.id)}>Edytuj</button>
                <button onClick={() => deleteDriverData(data.id)}>Usuń</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDeadlineReminder;

