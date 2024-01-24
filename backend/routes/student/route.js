const express = require("express");
const app = express();
const router = express.Router();
const JWTDecoder = require("../../utils/JWTDecoder");
const StudentRoleChecker = require("../../utils/StudentRoleChecker");
const {
	studentData,
	studentAdd,
	studentCourseUpdate,
	studentCourses,
	addCourseToStudentRequest,
	studentDashboard,
	CourseLectures,
	ParticularLecture,
} = require("../../controllers/student/studentController");

router.use(JWTDecoder);
router.use(StudentRoleChecker);

router.post("/details", studentData);

router.post("/add", studentAdd);

router.post("/courseAdd", studentCourseUpdate);

// router.post("/editProfile", editStudentProfile );

router.post("/myCourses", studentCourses);

router.post("/addCourseRequest", addCourseToStudentRequest);

router.post("/studentDashboard/:course", CourseLectures);

router.post("/studentDashboard/:course/:lecture", ParticularLecture);

// router.post("/home", studentDashboard);

module.exports = router;
