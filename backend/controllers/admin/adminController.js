const mongoose = require("mongoose");
const User = require("../../models/userReg");
const Student = require("../../models/studentDetails");
const Teacher = require("../../models/teacherDetails");
const Course = require("../../models/courses");
const cReq = require("../../models/cReq");

const RoleModify = async (req, res) => {
	try {
		console.log(req.user);
		const { role } = req.body;
		const { id: userId } = req.body;

		if (!role || !userId) {
			return res.status(400).json({ message: "Invalid request" });
		}

		const UserCurrDetails = await User.findOne(
			{ _id: new mongoose.Types.ObjectId(userId) },
			{ role: 1 }
		);
		// console.log(UserCurrDetails);

		if (role === UserCurrDetails.role) {
			return res.status(400).json({ message: "Same role" });
		}

		await User.updateOne(
			{ _id: new mongoose.Types.ObjectId(userId) },
			{ $set: { role: role } }
		);

		if (UserCurrDetails.role === "student") {
			await Student.deleteOne({ suser: new mongoose.Types.ObjectId(userId) });
			const newTeacher = new Teacher({
				tuser: new mongoose.Types.ObjectId(userId),
			});

			await newTeacher.save();
		}

		if (UserCurrDetails.role === "teacher") {
			await Teacher.deleteOne({ tuser: new mongoose.Types.ObjectId(userId) });
			const newStudent = new Student({
				suser: new mongoose.Types.ObjectId(userId),
			});

			await newStudent.save();
		}

		return res.status(200).json({ message: "Role modified successfully" });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const ApprovalStatusUpdate = async (req, res) => {
	try {
		const { userId, course, status } = req.body;
		if (!userId || !course) {
			return res.status(400).json({ message: "Invalid request" });
		}

		const updater = await cReq.updateOne(
			{
				suser: new mongoose.Types.ObjectId(userId),
				cno: new mongoose.Types.ObjectId(course),
			},
			{ $set: { status: status } }
		);

		if (updater.modifiedCount === 0) {
			return res.status(400).json({ message: "Unable to update" });
		}

		res.status(200).json({ message: "Updated successfully" });
		return;
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
		// console.log(teachers);
		res.status(200).json(teachers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.status(200).json(courses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const ApprovalsRequestsGet = async (req, res) => {
	try {
		const approvals = await cReq.find().populate("suser").populate("cno");
		res.status(200).json(approvals);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	RoleModify,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
	getAllUsers,
	ApprovalStatusUpdate,
	ApprovalsRequestsGet,
};
