import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";

const StudentDashboard = () => {
	const [coursesEnrolled, setCoursesEnrolled] = useState([]);

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		publicApi
			.post("api/student/courses", { token: token })
			.then((res) => {
				setCoursesEnrolled(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="mt-8">
			<h1 className="text-5xl font-bold">Student Dashboard</h1>
		</div>
	);
};

export default StudentDashboard;
