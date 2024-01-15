const mongoose = require("mongoose");

const apprSchema = new mongoose.Schema({
	suser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	cno: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "courses",
	},
	status: {
		type: Boolean,
		default: false,
	},
});

const approvals_schema = mongoose.model("approvals", apprSchema);
module.exports = approvals_schema;
