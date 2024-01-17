const express = require("express");
const router = express.Router();
const {
	RoleModify,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
	getAllUsers,
	getCourse,
	ApprovalStatusUpdate,
	ApprovalsRequestsGet,
	assignTeacher,
	teacherCourses,
	coursesTeachers,
} = require("../../controllers/admin/adminController");
const JWTDecoder = require("../../utils/JWTDecoder");
const AdminRoleChecker = require("../../utils/AdminRoleChecker");

router.use(JWTDecoder);
router.use(AdminRoleChecker);

router.post("/roleModify", RoleModify);

router.post("/teachers", getAllTeachers);

router.post("/students", getAllStudents);

router.post("/courses", getAllCourses);

router.post("/course/:id", getCourse);

router.post("/getAllUsers", getAllUsers);

router.post("/approvalStatusUpdate", ApprovalStatusUpdate);

router.post("/approvalsRequests", ApprovalsRequestsGet);

router.post("/assignTeacher", assignTeacher);

router.post("/teacherCourses/:id", teacherCourses);

router.post("/coursesTeachers", coursesTeachers);

module.exports = router;
