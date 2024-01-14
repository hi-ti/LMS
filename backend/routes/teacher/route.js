const express = require('express');
const app = express();
const router = express.Router();

const { teacherData, teacherAdd, teacherUpdate } = require('../../controllers/teacher/teacherController');

router.post("/details", teacherData);

router.post("/add", teacherAdd);

router.post("/courseAdd", teacherUpdate);

module.exports = router;