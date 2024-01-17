const mongoose = require("mongoose");
const User = require("../../models/userReg");
const Student = require("../../models/studentDetails");
const Teacher = require("../../models/teacherDetails");
const Course = require("../../models/courses");
const Lectures = require("../../models/cLectures");
const cReq = require("../../models/cReq");
const cTeachers = require("../../models/cTeachers");

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
		const courses = await Course.find().sort({ CrD: "desc" });
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

const getCourse = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const users = await cReq
			.find(
				{
					cno: new mongoose.Types.ObjectId(id),
					status: true,
				},
				{
					cno: 0,
					_id: 0,
				}
			)
			.populate("suser", { username: 1 });

		const course = await Course.findOne({
			_id: new mongoose.Types.ObjectId(id),
		});

		const lectures = await Lectures.find({
			cid: new mongoose.Types.ObjectId(id),
		}).sort({ order: "asc" });
		console.log(lectures);

		// console.log(course);
		res.status(200).json({ users, course, lectures });
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

const assignTeacher = async (req, res) => {
	const { cid } = req.body;
	const { cTeacher } = req.body;
	if (!cid || !cTeacher) {
		res.status(400).json("No id provided");
	}
	try {
		const teacherExists = await cTeachers.findOne({
			cid: new mongoose.Types.ObjectId(cid),
		});
		console.log(teacherExists);
		if (!teacherExists) {
			const newTeacher = new cTeachers({
				cid: cid,
				cTeacher: cTeacher,
			});
			await newTeacher.save();
		} else {
			const deleter = await cTeachers.deleteOne({
				cid: new mongoose.Types.ObjectId(cid),
			});
			console.log(deleter);
			const newTeacher = new cTeachers({
				cid: cid,
				cTeacher: cTeacher,
			});

			await newTeacher.save();

			if (newTeacher) {
				console.log("Course updated successfully");
			}
		}

		res.status(200).json("Assigned Course to teacher");
	} catch (e) {
		console.log(e);
		res.status(500).json("server error");
	}
};

const teacherCourses = async (req, res) => {
	const { id } = req.params;
	try {
		let teachers = await cTeachers
			.find({ cTeacher: new mongoose.Types.ObjectId(id) })
			.populate("cid");
		if (teachers.length > 0) {
			return res.status(200).json(teachers);
		} else {
			return res.status(201).send("not courses found");
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send(`Error ${err}`);
	}
};

const coursesTeachers = async (req, res) => {
	try {
		const courses = await Course.find({}, { _id: 1, cname: 1 });
		const teachers = await cTeachers
			.find({})
			.populate("cTeacher", { username: 1 });

		const allTeachers = await Teacher.find({}).populate("tuser", {
			username: 1,
		});
		// console.log(teachers);

		// courses.forEach((val, index) => {
		// 	// if (teachers.cid.toString() === val._id.toString()) {}
		// })

		teachers.forEach((val, index) => {
			courses.forEach((v, i) => {
				// console.log(val.cid.toString() == v._id.toString());
				if (val.cid.toString() == v._id.toString()) {
					console.log(`updating index ${i} and object ${v}`);
					// v["teacher"] = val.cTeacher.username;
					const newObj = { ...v._doc };
					newObj.teacher = val.cTeacher.username;
					newObj.teacherId = val.cTeacher._id;
					// console.log(newObj);
					courses[i] = newObj;
				}
			});
		});

		// courses[0] = "urmom";

		// console.log(courses);

		res.status(200).json({ courses, allTeachers });
	} catch (e) {
		res.status(400).json("Not working");
	}
};

module.exports = {
	RoleModify,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
	getCourse,
	getAllUsers,
	ApprovalStatusUpdate,
	ApprovalsRequestsGet,
	assignTeacher,
	teacherCourses,
	coursesTeachers,
};
