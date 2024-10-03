import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Salary: '',
        Department: '',
        JoiningDate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/update-employee/${employeeId}`, formData)
        .then(() => alert('Employee updated successfully!'))
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
                <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="Salary" placeholder="Salary" onChange={handleChange} required />
                <input type="text" name="Department" placeholder="Department" onChange={handleChange} required />
                <input type="date" name="JoiningDate" placeholder="Joining Date" onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
