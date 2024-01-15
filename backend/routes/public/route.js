const express = require("express");
const app = express();
const router = express.Router();

const {dashboard }= require('../../controllers/public/publicController');
console.log(dashboard)

router.get('/home', dashboard);

module.exports = router;