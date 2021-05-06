const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const cors = require('cors');
const employeeRoutes=express.Router;
const PORT = 4000;
//app.use(cors());
app.use(bodyParser.json());


let employee=require('./employee.model')

mongoose.connect('mongodb://127.0.0.1:27017/employees', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


employeeRoutes.route('/').get(function(req, res) {
    employee.find(function(err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    });
});

employeeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    employee.findById(id, function(err,employee) {
        res.json(employee);
    });
});



employeeRoutes.route('/add').post(function(req, res) {
    let employee = new employee(req.body);
    employee.save()
        .then(todo => {
            res.status(200).json({'employee': 'employee added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new emp failed failed');
        });
});


employeeRoutes.route('/update/:id').post(function(req, res) {
    employee.findById(req.params.id, function(err, employee) {
        if (!employee)
            res.status(404).send("data is not found");
        else
            employee.employee_name = req.body.employee_name;
        employee.employee_department = req.body.employee_department;

        employee.save().then(employee => {
            res.json('Employeelist updated!');
        })
            .catch(err => {
                res.status(400).send("Update not done");
            });
    });
});


app.use('/employees',employeeRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});