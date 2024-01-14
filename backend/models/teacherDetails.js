const mongoose = require("mongoose");
const user = require("../models/userReg.js");
// const cAddedSchema = require("../models/cAdded.js");

const teacherSchema = new mongoose.Schema({
	tuser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	trollno: {
		type: Number,
		unique: true,
		default: 1,
	},
	tbio: {
		type: String,
		minLength: 10,
		maxLength: 250,
	},
	texperience: {
		highestqualification: {
			type: String,
			enum: ["B.Ed", "B.Tech", "M.Tech", "M.Ed", "PhD"], //have to add more
		},
	},
	// tprofilepic: {
	//     type:
	// }
	// tcourse: {
	// 	type: Array[cAddedSchema],
	// },
});

const teachers = mongoose.model("teachers", teacherSchema);

module.exports = teachers;
