const express = require("express");
const app = express();
const router = express.Router();
const {
	studentData,
	studentAdd,
	studentUpdate,
} = require("../../controllers/student/studentController");

router.post("/details", studentData);

router.post("/add", studentAdd);

router.post("/courseAdd", studentUpdate);

module.exports = router;
