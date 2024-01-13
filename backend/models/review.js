const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	rtitle: {
		type: String,
		required: true,
	},
	rbody: {
		type: String,
		required: true,
		maxLength: 250,
	},
	rdate: {
		type: Date,
		default: Date.now(),
	},
	author: {
		id: {
			type: schema.Types.ObjectId,
			ref: "User",
		},
		username: String,
	},
	course: {
		id: {
			type: schema.Types.ObjectId,
			ref: "Course",
		},
		title: String,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
