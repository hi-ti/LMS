import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import { Link } from "react-router-dom";

const Courses = () => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await publicApi.get("api/home");
			setData(response.data.courses);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="min-h-screen mt-16 bg-gray-50 p-8">
			<h1 className="text-center text-4xl font-semibold mb-8 text-gray-800">All Courses</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{data.map((course, index) => (
					<Link to={`/course/${course._id}`} key={index}>
						<div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">{course.cname}</h2>
							<p className="text-lg text-gray-600">Branch: {course.cbranch}</p>
							<p className="text-lg text-gray-600">Total Lectures: {course.clec}</p>
							<p className="text-lg text-gray-600">Level: {course.clevel}</p>
							<p className="text-lg text-gray-600">Duration: {course.cdur.hours} hrs</p>
							<p className="text-md text-gray-500 mt-2">{course.cdes}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Courses;
