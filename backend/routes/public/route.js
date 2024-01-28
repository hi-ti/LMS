const express = require("express");
const router = express.Router();

const {dashboard }= require('../../controllers/public/publicController');

router.get('/home', dashboard);

module.exports = router;