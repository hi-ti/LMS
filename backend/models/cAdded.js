const mongoose = require('mongoose');
const courses = require('../models/courses');
const teachers = require('../models/teacherDetails')

const cAddedSchema = new mongoose.Schema ({
    cno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    },
    trollno : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }
})

const cadd = mongoose.model('cadd',cAddedSchema);

export default cadd;
