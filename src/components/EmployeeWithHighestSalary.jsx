import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeWithHighestSalary = () => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/employee-highest-salary')
        .then((response) => {
            setEmployee(response.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Employee with Highest Salary</h2>
            {employee && (
                <p>{employee.Name} - {employee.Department} - ${employee.Salary}</p>
            )}
        </div>
    );
};

export default EmployeeWithHighestSalary;
