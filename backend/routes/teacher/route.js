const express = require("express");
const app = express();
const router = express.Router();
const TeacherRoleChecker = require("../../utils/TeacherRoleChecker");
const JWTDecoder = require("../../utils/JWTDecoder");

const {
	teacherData,
	teacherAdd,
	teacherUpdate,
	CourseUpdate,
	teacherCourses,
} = require("../../controllers/teacher/teacherController");

router.use(JWTDecoder);
router.use(TeacherRoleChecker);

router.post("/details", teacherData);

router.post("/add", teacherAdd);

router.post("/courseAdd", teacherUpdate);

router.post("/courseEdit/:id", CourseUpdate);

router.post("/teacherCourses", teacherCourses);

module.exports = router;
