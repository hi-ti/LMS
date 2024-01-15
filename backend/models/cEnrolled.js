const mongoose = require("mongoose");

const cEnrolledSchema = new mongoose.Schema({
	cno: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "courses",
	},
	suser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "student",
	},
	cstatus: {
		type: String,
		enum: ["Completed", "Not completed"],
		required: true["Have not started the course"],
	},
	cedate: {
		type: Date,
		default: Date.now(),
	},
});

const cenr = mongoose.model("cenrs", cEnrolledSchema);

module.exports = cenr;
