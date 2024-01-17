const jwt = require("jsonwebtoken");

const JWTDecoder = (req, res, next) => {
	try {
		const { token } = req.body;
		if (!token) return res.status(403).json("no token");

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.status(403).json("invalid token");
			req.user = decoded;
			// console.log(req.user);
			next();
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = JWTDecoder;
