import React, { useState } from 'react';
import axios from 'axios';

const DeleteEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3000/delete-employee/${employeeId}`)
        .then(() => alert('Employee deleted successfully!'))
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Delete Employee</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
};

export default DeleteEmployee;
