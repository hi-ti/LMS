const mongoose = require("mongoose");
// const user = require("../models/userReg.js");
// const cenr = require("./cEnrolled.js");

const studentSchema = new mongoose.Schema({
	suser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	srollno: {
		type: String,
		unique: true,
		default: 1,
	},
	cenrolled: {
		type: Array,
		ref: "cenrs",
		required: true["Not enrolled for any course"],
	},
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
