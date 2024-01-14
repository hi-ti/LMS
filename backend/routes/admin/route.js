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
const AdminRoleChecker = require("../../utils/AdminRoleChecker");

const { RoleModify } = require("../../controllers/admin/adminController");

router.use(JWTDecoder);
router.use(AdminRoleChecker);

router.post("/roleModify", RoleModify);

router.post("/teachers", getAllTeachers);

router.post("/students", getAllStudents);

router.post("/courses", getAllCourses);

module.exports = router;
