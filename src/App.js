import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee';
import ViewEmployees from './components/ViewEmployees';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import EmployeeWithHighestSalary from './components/EmployeeWithHighestSalary';
import EmployeesByDateRange from './components/EmployeesByDateRange';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/view-employees" element={<ViewEmployees />} />
        <Route path="/update-employee" element={<UpdateEmployee />} />
        <Route path="/delete-employee" element={<DeleteEmployee />} />
        <Route path="/highest-salary" element={<EmployeeWithHighestSalary />} />
        <Route path="/employees-by-date-range" element={<EmployeesByDateRange />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
