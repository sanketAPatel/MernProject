const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employee = new Schema({

    employee_name: {
        type: String
    },
    employee_department: {
        type: String
    },
    todo_age: {
        type: String
    }
});
module.exports = mongoose.model('Employee',employee);