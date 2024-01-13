const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    ano: {
        type: Number,
        default: 1,
        required: true
    },
    alevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },
    asolution: {
        default: URL // proper
    },
    astatus: {
        type: String,
        enum: ['Pass','Fail'],
        default: 'Not attempted'
    }
})

const adetails = mongoose.model('adetails', assignmentSchema);

export default adetails;