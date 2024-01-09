const mongoose = require('mongoose');
const user = require("../models/userReg.js");
const cenr = require('./cEnrolled.js');

const studentSchema = new mongoose.Schema({
    suser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    srollno: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    cenrolled: {
        type: Array [cenr],
        ref: 'cenrolled',
        required: true ['Not enrolled for any course']
    }
})

const student = mongoose.model('student', studentSchema);

module.exports = student;