import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:3000/fetch-employees?page=${page}&limit=5`)
        .then((response) => {
            setEmployees(response.data);
        })
        .catch(err => console.log(err));
    }, [page]);

    return (
        <div>
            <h2>View Employees</h2>
            <ul>
                {employees.map(emp => (
                    <li key={emp.EmployeeId}>{emp.Name} - {emp.Department} - ${emp.Salary}</li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default ViewEmployees;
