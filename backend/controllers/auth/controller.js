const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userReg");

const Login = async (req, res) => {
	try {
		// Get user data from request body
		const { email, password } = req.body;
		// user exists
		let user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ message: "User does not exist" });
		// password is correct?
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Incorrect password" });
		// Create token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		// Send response
		res.status(200).json({ token: token, user: user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const Register = async (req, res) => {
	try {
		// Get user data from request body
		const { username, firstname, lastname, email, age, password, role } =
			req.body;
		// user exists
		let user = await User.findOne({ email: email });
		if (user) return res.status(400).json({ message: "User already exists" });
		// create new user
		user = new User({
			username,
			firstname,
			lastname,
			email,
			password,
		});
		// encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		// save user
		await user.save();
		// create token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		// send response
		res.status(200).json({ token: token, user: user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { Login, Register };
