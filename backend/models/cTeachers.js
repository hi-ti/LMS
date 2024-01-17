const mongoose = require("mongoose");

const cTeacherSchema = new mongoose.Schema({
	cTeacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	cid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "courses",
		required: true,
	},
});

const cTeachers = mongoose.model("courseteachers", cTeacherSchema);

module.exports = cTeachers;
