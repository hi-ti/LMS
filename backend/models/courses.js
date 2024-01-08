const mongoose = require('mongoose');
const Teacher = require("../models/userDetails")

const courseDetails = new mongoose.Schema ({
    cname: {
        type: String,
        required: true
    },
    cnumber: {
        type: Number,
        unique : true
        },
    cbranch: {
        type:String,
        required:true
    },
    cduration:{
        hours:Number,
        required: true
    },
    teacherId:{
        type:schema.Types.ObjectId ,
        ref:"teacher"  
    },
    cprogress: {
        type: Number,
        default:0,
        max: 100
    },
    clectures: {
        type:[{
            lectureName: String,
            videoLink: String
            }]            
    },
    cassignments: {
        type:[{
            assignmentName: String,
            submissionDate: Date,
            dueDate: Date
            }],
        default:[]
    },
    cenrolled: {
        type: Number,
        default: 0
    },
    clevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    cdescription: {
        type: String,
        minLength: 10,
        maxLength: 250
    }
})

const Courses = mongoose.model("Courses",courseDetails);

export default Courses;