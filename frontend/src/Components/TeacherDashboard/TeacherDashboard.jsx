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
			toast.error(response.data);
		}
	};

	useEffect(() => {
		dataFetcher();
	}, []);

	return (
		<div>
			<div className="text-5xl text-center font-bold">Assigned Courses</div>
			<div className="text-left">
				<div className="flex flex-wrap gap-x-3">
					{typeof courses === "object" ? (
						courses.map((e) => {
							return (
								<>
									<div className="bg-gray-200 py-4 px-2 w-64">
										<div className="flex flex-col gap-y-2">
											<div className="cname font-bold">{e.cid.cname}</div>
											<div className="text-underline">
												<Link
													to={`/course/${e.cid._id}`}
													className={"underline"}
												>
													View Course
												</Link>
											</div>
										</div>
									</div>
								</>
							);
						})
					) : (
						<div className="text-center">No Courses Found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
