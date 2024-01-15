const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	suser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	srollno: {
		type: String,
		unique: true,
		default: 1,
	}
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
