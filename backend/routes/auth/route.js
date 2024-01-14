const express = require("express");
const app = express();
const router = express.Router();

const {
	Login,
	Register,
	UserActivate,
} = require("../../controllers/auth/controller");

router.post("/login", Login);

router.post("/register", Register);

router.get("/activate/:id", UserActivate);

module.exports = router;
