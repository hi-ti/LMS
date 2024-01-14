const express = require("express");
const app = express();
const router = express.Router();
const TeacherRoleChecker = require("../../utils/TeacherRoleChecker");

const {
	teacherData,
	teacherAdd,
	teacherUpdate,
} = require("../../controllers/teacher/teacherController");

app.use(TeacherRoleChecker);

router.post("/details", teacherData);

router.post("/add", teacherAdd);

router.post("/courseAdd", teacherUpdate);

module.exports = router;
