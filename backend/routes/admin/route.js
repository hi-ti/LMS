const express = require("express");
const router = express.Router();
const {
	RoleModify,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
} = require("../../controllers/admin/adminController");
const JWTDecoder = require("../../utils/JWTDecoder");
const AdminRoleChecker = require("../../utils/AdminRoleChecker");

const {
	RoleModify,
	ApprovalStatusUpdate,
} = require("../../controllers/admin/adminController");

router.use(JWTDecoder);
router.use(AdminRoleChecker);

router.post("/roleModify", RoleModify);

router.post("/teachers", getAllTeachers);

router.post("/students", getAllStudents);

router.post("/courses", getAllCourses);

router.post("/approvalStatusUpdate", ApprovalStatusUpdate);

module.exports = router;
