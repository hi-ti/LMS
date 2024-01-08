const mongoose = require('mongoose');

const lecSchema = new mongoose.Schema({
    lnumber: {
        type: Number,
        required: true,
        min: 1
    },
    lname: {
        type: String,
        required: true
    },
    lduration: {
        hours: {
            type: Number,
            required: true,
            min: 0
        },
        minutes: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    },
    larea: {
        type: String,
        enum: ['CS', 'Math', 'Eng'] // Computer Science, Mathematics, English
    },
    cid: {
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }
})