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

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("suser");
        res.status(200).json(students);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate("tuser");
        res.status(200).json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("cno");
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { RoleModify, getAllStudents, getAllTeachers, getAllCourses };
