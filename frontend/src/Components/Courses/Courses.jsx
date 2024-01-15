import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import axios from "axios";

const Courses = () => {
	const [data, setData] = useState([
		{
			cname: "",
			cbranch: "",
			clec: 0,
			clevel: "beginner",
			cno: 0,
			cdur: {
				hours: 1,
			},
			cdes: "",
		},
	]);

	const fetchData = async () => {
		const data = await publicApi.get("api/home");
		console.log(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>Course Main</h1>
		</div>
	);
};

export default Courses;
