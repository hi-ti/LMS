const User = require("../models/userReg");
const mongoose = require("mongoose");

const TeacherRoleChecker = async (req, res, next) => {
	try {
		const { id } = req.user;
		// if (role !== "admin") return res.status(403).json("unauthorized");
		const result = await User.findOne(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ role: 1 }
		);
		const roleArray = ["teacher", "admin"];
		// console.log(result.role);

		if (!roleArray.includes(result.role))
			return res.status(403).json("Unauthorised");

		next();
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = TeacherRoleChecker;
