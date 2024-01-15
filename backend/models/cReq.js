const mongoose = require('mongoose')

const apprSchema = new mongoose.Schema({
    "suser": { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    "cno": { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }
});
module.exports = mongoose.model("approval", approvals_schema);
