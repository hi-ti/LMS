import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const StudentDashboard = () => {
	const [coursesEnrolled, setCoursesEnrolled] = useState([]);

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		try {
			const res = await publicApi.post("api/student/myCourses", { token: token });
			console.log(res);
			setCoursesEnrolled(res.data);
		} catch (err) {
			console.log(err);
			toast.error("Failed to fetch courses");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="mt-8 p-4">
			<h1 className="text-5xl font-bold text-center mb-8">Student Dashboard</h1>

			<div className="flex flex-wrap gap-6 justify-center">
				{coursesEnrolled !== "No courses" ? (
					coursesEnrolled.map((course) => (
						<div
							key={course.cno._id}
							className="bg-gray-200 py-4 px-6 w-64 rounded-xl shadow-lg flex flex-col justify-between"
						>
							<div className="text-left">
								<div className="text-2xl font-bold mb-2">{course.cno.cname}</div>
								<div className="text-xl font-semibold mb-1">{course.cno.clevel}</div>
								<div className="text-xl font-semibold mb-4">{course.cno.cbranch}</div>
							</div>
							<div className="flex flex-col gap-y-2">
								<Link
									to={`/course/${course.cno._id}`}
									className="text-blue-500 hover:text-blue-700 underline text-sm"
								>
									View Course Details
								</Link>
								<Link
									to={`/studentDashboard/studyCourse/${course.cno._id}`}
									className="text-blue-500 hover:text-blue-700 underline text-sm"
								>
									Continue
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

export default StudentDashboard;
