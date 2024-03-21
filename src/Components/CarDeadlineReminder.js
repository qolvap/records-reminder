import React, { useState } from 'react';

const CarDeadlineReminder = ({ addCarData, carData, setCarData }) => {
    const [carName, setCarName] = useState('');
    const [carDate, setCarDate] = useState('');
    const [editingId, setEditingId] = useState(null);

    const calculateDeadline = () => {
        const inputDate = new Date(carDate);
        if (!carName || !carDate || isNaN(inputDate.getTime())) {
            alert('Najpierw wprowadź wszystkie informacje');
            return;
        }

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

        alert(`Następny termin sczytania samochodu ${carName} to: ${deadlineDate.toLocaleDateString()}`);
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
                return {
                    ...data,
                    carName,
                    carDate: new Date(carDate),
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
            <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="Nr rejestracyjny" />
            <input type="date" value={carDate} onChange={(e) => setCarDate(e.target.value)} placeholder="Wybierz datę" />
            <button onClick={calculateDeadline}>Policz</button>

            <h3>Tachografy:</h3>
            <ul>
                {carData.map((data) => (
                    <li key={data.id}>
                        {editingId === data.id ? (
                            <>
                                <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="Nr rejestracyjny" />
                                <input type="date" value={carDate} onChange={(e) => setCarDate(e.target.value)} placeholder="Wybierz datę" />
                                <button onClick={() => updateCarData(data.id)}>Zapisz</button>
                            </>
                        ) : (
                            <>
                                <p>Numer rejestracyjny: {data.carName}</p>
                                <p>Data ostatniego sczytania samochodu: {data.carDate.toLocaleDateString()}</p>
                                <p>Data kolejnego sczytania samochodu: {data.deadlineDate.toLocaleDateString()}</p>
                                <button onClick={() => editCarData(data.id)}>Edytuj</button>
                                <button onClick={() => deleteCarData(data.id)}>Usuń</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarDeadlineReminder;

