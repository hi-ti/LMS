const mongoose = require("mongoose");
const User = require("../../models/userReg");

const RoleModify = async (req, res) => {
	try {
		console.log(req.user);
		const { role } = req.body;
		const { id } = req.user;

		await User.updateOne(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ $set: { role: role } }
		);

		return res.status(200).json({ message: "Role modified successfully" });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const ApprovalStatusUpdate = async (req, res) => {};

module.exports = { RoleModify, ApprovalStatusUpdate };
