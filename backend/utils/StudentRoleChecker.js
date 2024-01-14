const User = require("../models/userReg");
const mongoose = require("mongoose");

const StudentRoleChecker = async (req, res, next) => {
	try {
		const { id } = req.user;
		// if (role !== "admin") return res.status(403).json("unauthorized");
		const result = await User.findOne(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ role: 1 }
		);
		if (result.role !== "student" || result.role !== "admin")
			return res.status(403).json("Unauthorised");

		next();
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = StudentRoleChecker;
