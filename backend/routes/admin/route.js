const express = require("express");
const router = express.Router();
const {
	getAllTeachers,
} = require("../../controllers/teacher/teacherController");
const {
	getAllStudents,
} = require("../../controllers/student/studentController");
const {
	getAllCourses,
} = require("../../controllers/courses/coursesController");

const JWTDecoder = require("../../utils/JWTDecoder");

const { RoleModify } = require("../../controllers/admin/adminController");

router.use(JWTDecoder);

router.post("/roleModify", RoleModify);

router.get("/teachers", getAllTeachers);

router.get("/students", getAllStudents);

router.get("/courses", getAllCourses);

module.exports = router;
