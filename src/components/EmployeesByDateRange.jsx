import React, { useState } from 'react';
import axios from 'axios';

const EmployeesByDateRange = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employees, setEmployees] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/employees-joining-date-range?start=${startDate}&end=${endDate}`)
        .then((response) => {
            setEmployees(response.data);
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Employees by Joining Date Range</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                <button type="submit">Fetch</button>
            </form>
            <ul>
                {employees.map(emp => (
                    <li key={emp.EmployeeId}>{emp.Name} - {emp.Department} - {emp.JoiningDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeesByDateRange;
