const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/connectDB/connectDB");

// importing routes
const authRoute = require("./routes/auth/route");
const studentRoute = require("./routes/student/route");

const PORT = 5001;

app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
	connectDB();
});
