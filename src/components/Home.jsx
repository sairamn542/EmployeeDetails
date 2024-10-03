import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <nav>
        <ul className='d-flex justify-content-between'>
          <li><Link to="/">Welcome to Dashboard Page</Link></li>
          <li><Link to="/create-employee">Create Employee</Link></li>
          <li><Link to="/view-employees">View Employees</Link></li>
          <li><Link to="/update-employee">Update Employee</Link></li>
          <li><Link to="/delete-employee">Delete Employee</Link></li>
          <li><Link to="/highest-salary">Employee with Highest Salary</Link></li>
          <li><Link to="/employees-by-date-range">Employees by Date Range</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home