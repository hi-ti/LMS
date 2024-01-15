const express = require("express");
const router = express.Router();
const {
	RoleModify,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
	getAllUsers,
	ApprovalStatusUpdate,
	ApprovalsRequestsGet,
} = require("../../controllers/admin/adminController");
const JWTDecoder = require("../../utils/JWTDecoder");
const AdminRoleChecker = require("../../utils/AdminRoleChecker");

router.use(JWTDecoder);
router.use(AdminRoleChecker);

router.post("/roleModify", RoleModify);

router.post("/teachers", getAllTeachers);

router.post("/students", getAllStudents);

router.post("/courses", getAllCourses);

router.post("/getAllUsers", getAllUsers);

router.post("/approvalStatusUpdate", ApprovalStatusUpdate);

router.post("/approvalsRequests", ApprovalsRequestsGet);

module.exports = router;
