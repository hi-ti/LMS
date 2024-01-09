const mongoose = require('mongoose');
const user = require("../models/userReg.js")

const teacherSchema = new mongoose.Schema({
    trollno : {
        type: Number,
        unique: true,
        required: true
    },
    tbio: {
        type: String,
        minLength: 10,
        maxLength: 250
    },
    texperience: {
        highestqualification : {
            type: String,
            enum: ['B.Ed', 'B.Tech', 'M.Tech', 'M.Ed', 'PhD'] //have to add more
        }
    },
    // tprofilepic: {
    //     type: 
    // }
    tcourse : {
        type: Array [cAddedSchema]
    }

})

const teachers = mongoose.model('teachers',teacherSchema)

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

const courseAdded = mongoose.model('courseAdded',cAddedSchema);

export default teachers;