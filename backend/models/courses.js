const mongoose = require("mongoose");

const courseDetails = new mongoose.Schema({
	cname: {
		type: String,
		required: true,
	},
	cbranch: {
		type: String,
		default: 'CSE'
	},
	cdur: {
		hours: {
			type: Number,
			default: 0
		},
	},
	clec: {
		type: Number,
		default: 1
	},
	clevel: {
		type: String,
		enum: ["beginner", "intermediate", "advanced"],
		default: "beginner",
	},
	cdes: {
		type: String,
		minlength: 10,
		maxlength: 250,
	},
	CrD: {
		type: Date,
		default: Date.now()
	}
});

const courses = mongoose.model("courses", courseDetails);

module.exports = courses;
