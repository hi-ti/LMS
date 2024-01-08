const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/connectDB/connectDB");

// importing routes
const authRoute = require("./routes/auth/route");

const PORT = 5000;

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
	connectDB();
});
