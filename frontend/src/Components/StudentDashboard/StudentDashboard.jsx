import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
	const [coursesEnrolled, setCoursesEnrolled] = useState([]);

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		publicApi
			.post("api/student/myCourses", { token: token })
			.then((res) => {
				console.log(res);
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

			<div className="flex flex-wrap gap-x-4 w-full mt-8">
				{coursesEnrolled.map((course) => (
					<>
						<div className="bg-gray-200 py-4 px-2 w-64 rounded-xl">
							<div className="flex flex-col gap-y-2 text-left">
								<div className="text-2xl font-bold">{course.cno.cname}</div>
								<div className="text-xl font-semibold">{course.cno.clevel}</div>
								<div className="text-xl font-semibold">
									{course.cno.cbranch}
								</div>

								<div className="flex flex-col gap-y-1">
									<Link
										to={`/course/${course.cno._id}`}
										className="underline font-regular text-sm"
									>
										View Course Details
									</Link>

									<Link
										to={`/studentDashboard/studyCourse/${course.cno._id}`}
										className="underline font-regular text-sm"
									>
										Continue
									</Link>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		</div>
	);
};

export default StudentDashboard;
