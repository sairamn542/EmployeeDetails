const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const conString = 'mongodb://127.0.0.1:27017';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create-employee', (req, res) => {
    console.log(req.body); // Log the incoming request body
    const employee = {
        EmployeeId: req.body.EmployeeId,
        Name: req.body.Name,
        Salary: req.body.Salary,
        Department: req.body.Department,
        JoiningDate: new Date(req.body.JoiningDate),
        Skills: req.body.Skills || []
    };

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees').insertOne(employee).then(() => {
            res.send({ message: 'Employee Created Successfully' });
        });
    }).catch(err => res.status(500).send(err));
    console.log('Data added successfully');
    
});


// API to fetch all employees in ascending order with pagination
app.get('/fetch-employees', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees')
            .find({})
            .sort({ Name: 1 }) // Ascending order by Name
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(employees => res.send(employees));
    }).catch(err => res.status(500).send(err));
});

// API to fetch an employee by EmployeeId
app.get('/employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees').findOne({ EmployeeId: employeeId }).then(employee => {
            if (employee) res.send(employee);
            else res.status(404).send({ message: 'Employee Not Found' });
        });
    }).catch(err => res.status(500).send(err));
});

// API to update employee details by EmployeeId
app.put('/update-employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);

    const updatedData = {
        $set: {
            Name: req.body.Name,
            Salary: req.body.Salary,
            Department: req.body.Department,
            JoiningDate: new Date(req.body.JoiningDate)
        }
    };

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees').updateOne({ EmployeeId: employeeId }, updatedData).then(() => {
            res.send({ message: 'Employee Updated Successfully' });
        });
    }).catch(err => res.status(500).send(err));
    console.log('data posted');
    
});

// API to delete an employee by EmployeeId
app.delete('/delete-employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees').deleteOne({ EmployeeId: employeeId }).then(() => {
            res.send({ message: 'Employee Deleted Successfully' });
        });
    }).catch(err => res.status(500).send(err));
});

// API to fetch the employee with the highest salary
app.get('/employee-highest-salary', (req, res) => {
    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees')
            .find({})
            .sort({ Salary: -1 }) // Descending order by Salary
            .limit(1)
            .toArray()
            .then(employee => {
                if (employee.length > 0) res.send(employee[0]);
                else res.status(404).send({ message: 'No Employees Found' });
            });
    }).catch(err => res.status(500).send(err));
});

// API to fetch all employees based on their joining date range
app.get('/employees-joining-date-range', (req, res) => {
    const { start, end } = req.query; // Expecting 'start' and 'end' query params

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees')
            .find({
                JoiningDate: {
                    $gte: new Date(start),
                    $lte: new Date(end)
                }
            })
            .toArray()
            .then(employees => res.send(employees));
    }).catch(err => res.status(500).send(err));
});

app.put('/add-skill/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const newSkill = req.body.Skill; 

    mongoClient.connect(conString).then(client => {
        const db = client.db('company');
        db.collection('employees')
            .updateOne({ EmployeeId: employeeId }, { $push: { Skills: newSkill } }) // Push new skill into Skills array
            .then(() => {
                res.send({ message: 'Skill Added Successfully' });
            });
    }).catch(err => res.status(500).send(err));
});

// Start the server
app.listen(3000, () => {
    console.log('Server started at http://127.0.0.1:3000');
});
