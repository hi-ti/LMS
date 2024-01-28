const express = require("express");
const router = express.Router();

const {
	courseData,
	courseAdd,
	courseUpdate,
} = require("../../controllers/courses/coursesController");

router.post("/details", courseData);

router.post("/add", courseAdd);

router.post("/update", courseUpdate);

module.exports = router;
