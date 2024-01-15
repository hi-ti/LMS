import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import { Link } from "react-router-dom";
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
		const dataFetcher = await publicApi.get("api/home");
		console.log(dataFetcher.data.courses);
		setData(dataFetcher.data.courses);
		console.log(dataFetcher);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container mx-auto courses">
			<div className="flex flex-col gap-y-8">
				<p className="text-center text-5xl font-bold">All Courses</p>

				<div className="grid grid-cols-3 gap-4 text-left">
					{data.map((course, index) => (
						<Link to={`/course/${course._id}`} key={index}>
							<div className="bg-gray-200 rounded-lg shadow-lg p-4">
								<p className="text-2xl font-bold">
									Course Name: {course.cname}
								</p>
								<p className="text-xl font-bold">Branch: {course.cbranch}</p>
								<p className="text-xl font-bold">
									Total Lectures: {course.clec}
								</p>
								<p className="text-xl font-bold">Level: {course.clevel}</p>
								<p className="text-xl font-bold">
									Duration: {course.cdur.hours} hrs
								</p>
								<p className="text-lg font-bold">{course.cdes}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Courses;
