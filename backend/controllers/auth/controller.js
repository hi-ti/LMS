const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userReg");
const SendEmail = require("../../utils/SendEmail");

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

		// send email
		const link = `${process.env.URL}/api/auth/activate/${token}`;
		const subject = "Activate your account";
		const message = `<h1>Hi ${user.username}</h1>
		<p>Thank you for registering</p>
		<p>Please click on the link below to activate your account</p>
		<a href=${link}>${link}</a>
		`;

		await SendEmail({ email: user.email, subject: subject, message: message });
		// send response
		res.status(200).json({ user: user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const UserActivate = async (req, res) => {
	// console.log(req.params);
	// Get token from request params
	const { id: token } = req.params;
	// check if token is valid
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!decoded)
		return res.status(400).json({ message: "Invalid activation link" });
	// get user id from decoded token
	const { id } = decoded;
	try {
		// find user
		let user = await User.findById(id);
		if (!user) return res.status(400).json({ message: "User does not exist" });
		// check if user is already verified
		if (user.isVr)
			return res.status(400).json({ message: "User already verified" });
		// update user
		await User.updateOne(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ $set: { isVr: true } }
		);
		// send response
		res.status(200).json({ message: "User verified" });
	} catch (err) {
		res.status(500).json({ message: err.message });
		User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
	}
};

module.exports = { Login, Register, UserActivate };
