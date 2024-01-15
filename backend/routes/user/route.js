const express = require("express");
const app = express();
const router = express.Router();
const { editProfile } = require('../../controllers/user/userController');
const JWTDecoder = require("../../utils/JWTDecoder");

router.use(JWTDecoder)

router.post('/editProfile', editProfile);

module.exports = router;