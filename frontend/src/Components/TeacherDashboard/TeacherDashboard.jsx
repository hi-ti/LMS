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
		<div className="min-h-screen p-8 bg-custom-dark flex flex-col items-center">
			<h2 className="text-4xl mt-8 font-bold mb-8 text-custom-red">Assigned Courses</h2>
			<div className="flex flex-wrap gap-6 justify-center">
				{courses && courses.length > 0 ? (
					courses.map((e) => (
						<div
							key={e.cid._id}
							className="bg-custom-light py-4 px-6 w-64 rounded-xl shadow-lg flex flex-col justify-between"
						>
							<div className="text-center">
								<div className="text-3xl font-bold mb-2 text-custom-red">
									{e.cid.cname}
								</div>
							</div>
							<div className="flex flex-col gap-y-2">
								<Link
									to={`/course/${e.cid._id}`}
									className="text-custom-red border-1 border-custom-red py-1 px-4 rounded-full font-semibold hover:bg-custom-red hover:text-custom-light transition duration-200"
								>
									View Course
								</Link>
							</div>
						</div>
					))
				) : (
					<div className="text-center text-xl text-custom-red">No Courses Found</div>
				)}
			</div>
		</div>
	);
};

export default TeacherDashboard;
