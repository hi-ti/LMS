const mongoose = require("mongoose");

const courseDetails = new mongoose.Schema({
	cname: {
		type: String,
		required: true,
	},
	cno: {
		type: Number,
		unique: true,
	},
	cbranch: {
		type: String,
		required: true,
	},
	cdur: {
		hours: {
			type: Number,
			required: true,
		},
	},
	clec: {
		type: Array,
	},
	clevel: {
		type: String,
		enum: ["beginner", "intermediate", "advanced"],
	},
	cdes: {
		type: String,
		minlength: 10,
		maxlength: 250,
	},
});

const courses = mongoose.model("courses", courseDetails);

module.exports = courses;
