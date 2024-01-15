const mongoose = require("mongoose");
const Courses = require("../../models/courses");

const dashboard = async (req, res) => {
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

module.exports = { dashboard }