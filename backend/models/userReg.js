const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter a valid username"],
		unique: true,
	},
	firstname: {
		type: String,
		required: [true, "Please enter your first name"],
	},
	lastname: {
		type: String,
		required: [true, "Please enter your lastname"],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "Please provide an email"],
	},
	dob: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["student", "teacher", "admin"],
		default: "student",
	},

	// is Verified
	isVr: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("users", userSchema);

module.exports = User;
