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
            default: 0,
            max: 59
        },
        seconds: {
            type: Number,
            default: 0,
            max: 59
        }
    },
    // cid: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'course'
    // }
})

const Lectures = mongoose.model('Lectures', lecSchema);

export default Lectures;