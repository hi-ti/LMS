const mongoose = require('mongoose');
// const teacher = require("../models/userDetails")
const lectures = require('../models/lecDetails');
const assignments = require('../models/assignment')


const courseDetails = new mongoose.Schema ({
    cname: {
        type: String,
        required: true
    },
    cno: {
        type: Number,
        unique : true
        },
    cbranch: {
        type:String,
        required:true
    },
    cdur:{
        hours:Number,
        required: true
    },
    cprog: {
        type: Number,
        default:0,
        max: 100
    },
    clec: {
        type: Array [lectures]      // lec ki b vid uploading      
    },
    casgn: {
        type: Array [assignments],
        default:[] //assign ki b koi file upload krni pdegi 
    },
    cenrno: {
        type: Number,
        default: 0
    },
    clevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    cdes: {
        type: String,
        minLength: 10,
        maxLength: 250
    }
})

const courses = mongoose.model("courses",courseDetails);

export default courses;