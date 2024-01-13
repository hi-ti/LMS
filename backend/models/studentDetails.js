const mongoose = require("mongoose");
const user = require("../models/userReg.js");

const studentSchema = new mongoose.Schema({
	suser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
		unique: true,
	},
	scourses: [
		{
			cid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "courses",
			},
		},
	],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
