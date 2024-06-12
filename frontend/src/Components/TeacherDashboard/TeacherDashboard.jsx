import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
	const [courses, setCourses] = useState([]);

	const token = sessionStorage.getItem("token");

	const dataFetcher = async () => {
		try {
			const response = await publicApi.post("api/teacher/teacherCourses", {
				token: token,
			});
			console.log(response);
			setCourses(response.data);
		} catch (err) {
			console.log(err);
			toast.error("Failed to fetch courses");
		}
	};

	useEffect(() => {
		dataFetcher();
	}, []);

	return (
		<div className="mt-16 p-4">
			<div className="text-5xl font-bold text-center mb-8">Assigned Courses</div>
			<div className="flex flex-wrap gap-6 justify-center">
				{courses && courses.length > 0 ? (
					courses.map((e) => (
						<div key={e.cid._id} className="bg-gray-200 py-4 px-6 w-64 rounded-xl shadow-lg flex flex-col justify-between">
							<div className="text-left">
								<div className="text-2xl font-bold mb-2">{e.cid.cname}</div>
							</div>
							<div className="flex flex-col gap-y-2">
								<Link
									to={`/course/${e.cid._id}`}
									className="text-blue-500 hover:text-blue-700 underline text-sm"
								>
									View Course
								</Link>
							</div>
						</div>
					))
				) : (
					<div className="text-center text-xl">No Courses Found</div>
				)}
			</div>
		</div>
	);
};

export default TeacherDashboard;
