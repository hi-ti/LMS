const Student = require("../../models/studentDetails");
const User = require("../../models/userReg");
const mongoose = require("mongoose");

const studentData = async (req, res) => {
	try {
		// destructring id from body
		const { id } = req.body;

		// finding a studemnt using suser and converting string id recieved from body to objectId and populating it with suser
		const studentDetails = await Student.findOne({
			suser: new mongoose.Types.ObjectId(id),
		}).populate("suser");

		if (!studentDetails) {
			res.status(404).json("User Not Found");
		} else {
			res.status(200).json(studentDetails);
		}
		console.log(studentDetails);
	} catch (e) {
		console.log(e);
		res.status(400).json({});
	}
};

const studentAdd = async (req, res) => {
	try {
		const { id } = req.body;

		const UserExists = await User.findById(id);
		// console.log(UserExists);
		if (!UserExists) {
			res.status(404).json("User Not Found");
			return;
		}

		const addAStudent = new Student({
			suser: id,
		});

		await addAStudent.save();

		res.status(200).json({});
	} catch (e) {
		console.log(e);
		res.status(400).json({});
	}
};

const studentUpdate = async (req, res) => {
	try {
		const { id } = req.body;
		const { data } = req.body;

		console.log(id, data);

		const updatedStudent = await Student.updateOne(
			{ suser: new mongoose.Types.ObjectId(id) },
			{
				scourses: {
					$push: {
						cid: new mongoose.Types.ObjectId(data.cid),
					},
				},
			}
		);

		console.log(updatedStudent);

		if (updatedStudent.modifiedCount === 0) {
			res.status(400).json("Unable to add course");
		}

		res.status(200).json({});
	} catch (e) {
		console.log(e);
		res.status(400).json({});
	}
};

const Courses = require('./path-to-your-course-model');
const Students = require('./path-to-your-student-model');

const getStudentHomeData = async (req, res) => {
	try {
		// Fetch all courses
		const allCourses = await Courses.find({});

		// Fetch a specific student (you may need authentication to get the current logged-in student)
		// const student = await Students.findOne({ name: 'John Doe' }).populate('enrolledCourses');

		res.json({
			courses: allCourses,
			// enrolledCourses: student.enrolledCourses,
			// studentName: student.name,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
}


module.exports = {
	studentData,
	studentAdd,
	studentUpdate,
	getStudentHomeData
};
