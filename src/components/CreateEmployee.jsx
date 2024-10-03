import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        EmployeeId: '',
        Name: '',
        Salary: '',
        Department: '',
        JoiningDate: '',
        Skills: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/create-employee', {
            ...formData,
            Skills: formData.Skills.split(',') // Convert skills to array
        })
        .then(() => alert('Employee created successfully!'))
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="EmployeeId" placeholder="Employee ID" onChange={handleChange} required />
                <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="Salary" placeholder="Salary" onChange={handleChange} required />
                <input type="text" name="Department" placeholder="Department" onChange={handleChange} required />
                <input type="date" name="JoiningDate" placeholder="Joining Date" onChange={handleChange} required />
                <input type="text" name="Skills" placeholder="Skills (comma-separated)" onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
