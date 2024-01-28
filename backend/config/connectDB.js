const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
	try {
		console.log(process.env.MONGO_URI);
		await mongoose.connect("mongodb+srv://ansh:xjppzROGW0Xg8cGv@work.5omxrej.mongodb.net/?retryWrites=true&w=majority");
		console.log("MongoDB connection SUCCESS");
	} catch (error) {
		console.log(error);
		console.log("MongoDB connection FAIL");
		process.exit(1);
	}
};

module.exports = connectDB;