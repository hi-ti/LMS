const Teacher = require("../../models/teacherDetails");
const User = require("../../models/userReg");
const Course = require("../../models/courses");
const Lectures = require("../../models/cLectures");
const cTeachers = require("../../models/cTeachers");
const mongoose = require("mongoose");

const teacherData = async (req, res) => {
	try {
		const { id } = req.body;

		const teacherDetails = await Teacher.findOne({
			tuser: new mongoose.Types.ObjectId(id),
		}).populate("tuser");

		if (!teacherDetails) {
			res.status(404).json("Teacher not found");
		} else {
			res.status(200).json(teacherDetails);
		}
		console.log(teacherDetails);
	} catch (e) {
		console.log(e);
		res.status(400).json({});
	}
};

const teacherAdd = async (req, res) => {
	try {
		const { id } = req.body;

		const teacherExists = await User.findById(id);

		if (!teacherExists) {
			res.send(404).json("Teacher Not Found");
			return;
		}

		const addTeacher = new Teacher({
			tuser: id,
		});

		await addTeacher.save();
		//console.log(addTeacher);
		res.status(201).json(addTeacher);
		//res.status(200).json({});
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

const teacherUpdate = async (req, res) => {
	try {
		const { id } = req.body;
		const { data } = req.body;

		console.log(id, data);

		const updatedTeacher = await Teacher.updateOne(
			{
				tuser: new mongoose.Types.ObjectId(id),
			},
			{
				tcourses: {
					$push: {
						cid: new mongoose.Types.ObjectId(data.cid),
					},
				},
			}
		);
		console.log(updatedTeacher);

		if (updatedTeacher.modifiedCount === 0) {
			res.status(400).json("Unable to add course");
		}

		res.status(200).json({});
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

const CourseUpdate = async (req, res) => {
	try {
		const { cid } = req.body;
		const { courseDetails } = req.body;
		const { newLectures } = req.body;

		const courseUpdater = await Course.updateOne(
			{ _id: new mongoose.Types.ObjectId(cid) },
			courseDetails
		);
		// Add the new lecture to the existing list of lectures in the database
		const deleted = await Lectures.deleteMany({
			cid: new mongoose.Types.ObjectId(cid),
		});

		if (!deleted.acknowledged) {
			res.status(400).json("Unable to delete");
			return;
		}

		// console.log(deleted);

		newLectures.forEach(async (object) => {
			const newLecture = new Lectures({
				cid: new mongoose.Types.ObjectId(cid),
				name: object.name,
				lecDesc: object.lecDesc,
				leclink: object.leclink,
				order: object.order,
			});

			await newLecture.save();
		});

		res.status(200).json("Done updating");
	} catch (e) {
		console.error(e);
	}
};

const teacherCourses = async (req, res) => {
	const { id } = req.user;
	// console.log(id);
	try {
		let teachers = await cTeachers
			.find({ cTeacher: new mongoose.Types.ObjectId(id) })
			.populate("cid");
		// console.log(teachers);
		if (teachers.length > 0) {
			return res.status(200).json(teachers);
		} else {
			return res.status(201).send("no courses found");
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send(`Error ${err}`);
	}
};

module.exports = {
	teacherData,
	teacherAdd,
	teacherUpdate,
	CourseUpdate,
	teacherCourses,
};
