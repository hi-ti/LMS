const Student = require("../../models/studentDetails");
const User = require("../../models/userReg");
const mongoose = require("mongoose");
const Courses = require("../../models/courses");
const Lectures = require("../../models/cLectures");
const cReq = require("../../models/cReq");

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

const studentCourses = async (req, res) => {
	const { id: userId } = req.user;

	try {
		const student = await cReq
			.find({
				suser: new mongoose.Types.ObjectId(userId),
				status: true,
			})
			.populate("cno");
		if (student.length > 0) {
			res.status(200).json(student);
			return;
		} else {
			res.status(201).json("No courses");
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addCourseToStudentRequest = async (req, res) => {
	try {
		const { id } = req.user;
		const { data } = req.body;

		// console.log(id, data);
		if (!id || !data) {
			res.status(400).json("Invalid Request");
			return;
		}

		const CourseExisits = await Courses.findOne(
			{ _id: new mongoose.Types.ObjectId(data.cid) },
			{ _id: 1 }
		);

		if (!CourseExisits) {
			res.status(404).json("Course Not Found");
			return;
		}

		const RequestExists = await cReq.findOne({
			cno: new mongoose.Types.ObjectId(data.cid),
			suser: new mongoose.Types.ObjectId(id),
		});
		// console.log(RequestExists);

		if (RequestExists) {
			if (RequestExists.status === true) {
				res.status(400).json("Request Already Approved");
				return;
			}
			res.status(400).json("Request Already Exists");
			return;
		}

		const createRequest = new cReq({
			cno: data.cid,
			suser: id,
		});

		await createRequest.save();

		// const AddRequest = await console.log(updatedStudent);

		// if (updatedStudent.modifiedCount === 0) {
		// 	res.status(400).json("Unable to add course");
		// }

		res.status(200).json({});
	} catch (e) {
		console.log(e);
		res.status(400).json({});
	}
};

const CourseLectures = async (req, res) => {
	const { course } = req.params;

	if (!course) {
		res.status(400).json("Course not found");
		return;
	}

	try {
		const { id: userId } = req.user;
		// console.log(course);
		// console.log(userId);
		const checkIfApproved = await cReq.findOne(
			{
				cno: new mongoose.Types.ObjectId(course),
				suser: new mongoose.Types.ObjectId(userId),
			},
			{ status: 1 }
		);
		console.log(checkIfApproved);

		if (!checkIfApproved) {
			res.status(404).json("No request made");
			return;
		}
		if (!checkIfApproved.status) {
			res.status(401).json("Course not allowed");
			return;
		}

		const lecturesFound = await Lectures.find({
			cid: new mongoose.Types.ObjectId(course),
		})
			.populate("cid")
			.sort({ order: "asc" });
		// console.log(lecturesFound);

		if (lecturesFound.length === 0) {
			res.status(404).json("Lectures Not Found");
			return;
		}

		res.status(200).json(lecturesFound);
		return;
	} catch (e) {
		console.log(e);
		res.status(500).json("Internal Server error");
	}
};

const ParticularLecture = async (req, res) => {
	const { course, lecture } = req.params;
	const { id: userId } = req.user;

	if (!course || !lecture) {
		res.status(400).json("Bad Request");
		return;
	}
	try {
		const checkIfApproved = await cReq.findOne(
			{
				cno: new mongoose.Types.ObjectId(course),
				suser: new mongoose.Types.ObjectId(userId),
			},
			{ status: 1 }
		);

		if (!checkIfApproved) {
			res.status(404).json("No request made");
			return;
		}
		if (!checkIfApproved.status) {
			res.status(401).json("Course not allowed");
			return;
		}

		const lectureFound = await Lectures.findOne({
			cid: new mongoose.Types.ObjectId(course),
			_id: new mongoose.Types.ObjectId(lecture),
		});

		if (!lectureFound) {
			res.status(404).json("Lecture not found");
			return;
		}

		res.status(200).json(lectureFound);
	} catch (e) {
		res.status(500).json("Internal server error");
	}
};

module.exports = {
	studentData,
	studentAdd,
	studentUpdate,
	studentCourses,
	addCourseToStudentRequest,
	CourseLectures,
	ParticularLecture,
};
