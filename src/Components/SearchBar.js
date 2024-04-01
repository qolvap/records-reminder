import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { Search } from 'react-bootstrap-icons'; 

const SearchBar = ({ searchData, setSearchData, filteredCars, filteredDrivers }) => {
    const [showResults, setShowResults] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        setSearchData(searchText);
        setShowResults(searchText !== '');
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    const renderFilteredResults = () => {
        if (!showResults) {
            return null;
        }

        if (filteredCars.length === 0 && filteredDrivers.length === 0) {
            return <p>Nie znaleziono</p>;
        }

        return (
            <div className="mt-3">
                <h2>Szybki wgląd:</h2>
                {filteredDrivers.map((driver, index) => (
                    <Card key={index} body className="shadow p-3 mb-3 bg-white rounded">
                        <p>Kierowca: {driver.driverFirstName} {driver.driverSecondName}</p>
                        <p>Data ostatniego pobrania karty: <Badge bg="secondary">{driver.cardDate.toLocaleDateString()}</Badge></p>
                        <p>Data kolejnego pobrania karty: <Badge bg="warning" text="dark">{driver.deadlineDate.toLocaleDateString()}</Badge></p>
                    </Card>
                ))}
                {filteredCars.map((car, index) => (
                    <Card key={index} body className="shadow p-3 mb-3 bg-white rounded">
                        <p>Numer rejestracyjny: {car.carName}</p>
                        <p>Data ostatniego sczytania samochodu: <Badge bg="secondary">{car.carDate.toLocaleDateString()}</Badge></p>
                        <p>Data kolejnego sczytania samochodu: <Badge bg="warning" text="dark">{car.deadlineDate.toLocaleDateString()}</Badge></p>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className="m-5">
            <BootstrapNavbar expand="lg" className="bg-body-tertiary">
                <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
                <BootstrapNavbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Wpisz hasło"
                            className="me-2"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button variant="outline-success" className="mt-2" onClick={handleSearch}> <Search /></Button>
                    </Form>
                </BootstrapNavbar.Collapse>
            </BootstrapNavbar>
            {showResults && (
                <Button variant="outline-primary" className="mt-2" onClick={handleHideResults}>Schowaj wyniki</Button>
            )}
            {renderFilteredResults()}
        </div>
    );
};

export default SearchBar;
