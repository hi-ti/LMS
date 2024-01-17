const mongoose = require("mongoose");

const CLecsSchema = new mongoose.Schema({
	cid: { type: String, required: true },
	name: { type: String, required: true },
	lecDesc: { type: String, default: "" },
	leclink: { type: String, required: true },
	order: { type: Number, required: true },
});

const Lectures = mongoose.model("lectures", CLecsSchema);

module.exports = Lectures;
