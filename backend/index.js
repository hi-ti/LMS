const express = require("express");
const app = express();
const cors = require("cors");
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());
const connectDB = require("./config/connectDB/connectDB");

app.options("*", cors());

//x

// importing routes
const authRoute = require("./routes/auth/route");
const studentRoute = require("./routes/student/route");
const teacherRoute = require("./routes/teacher/route");
const courseRoute = require("./routes/course/route");
const adminRoute = require("./routes/admin/route");
const homeRoute = require("./routes/public/route");
const userRoute = require("./routes/user/route");

const PORT = 5001;

app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/course", courseRoute);
app.use("/api/admin", adminRoute);
app.use("/api", homeRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
	connectDB();
});

// ayy
