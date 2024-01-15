const express = require("express");
const JWTDecoder = require("../../utils/JWTDecoder");
const app = express();
const router = express.Router();

const {
	Login,
	Register,
	UserActivate,
	UserChangePassword,
	PasswordChanger,
} = require("../../controllers/auth/controller");

router.post("/login", Login);

router.post("/register", Register);

router.get("/activate/:id", UserActivate);

router.post("/changePassword", JWTDecoder, UserChangePassword);

router.post("/changePassword/:token", PasswordChanger);

module.exports = router;
