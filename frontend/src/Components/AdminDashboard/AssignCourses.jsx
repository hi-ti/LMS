import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const AssignCourses = () => {
	const [courses, setCourses] = useState([]);
	const [allTeachers, setAllTeachers] = useState([]);

	const token = sessionStorage.getItem("token");

	const dataFetcher = async () => {
		try {
			const response = await publicApi.post("api/admin/coursesTeachers", {
				token: token,
			});

			if (response.status === 200) {
				setCourses(response.data.courses);
				setAllTeachers(response.data.allTeachers);
			}
		} catch (e) {
			toast.error("Failed to fetch data");
		}
	};

	useEffect(() => {
		dataFetcher();
	}, []);

	const handleSelect = async (event, course) => {
		try {
			const response = await publicApi.post("api/admin/assignTeacher", {
				token: token,
				cid: course._id,
				cTeacher: event.target.value,
			});
			if (response.status === 200) {
				toast.success("Assigned the course to teacher");
				dataFetcher(); // Refresh data after assignment
			}
		} catch (e) {
			toast.error("Error assigning");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-4xl font-bold mb-8">Assign Courses</h1>

			<div className="space-y-6">
				{courses.map((course) => (
					<div key={course._id} className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-4">{course.cname}</h2>
						<select
							onChange={(event) => handleSelect(event, course)}
							className="bg-gray-200 w-72 py-2 px-3 rounded-lg"
						>
							<option value={course.teacher ? course.teacherId : "null"}>
								{course.teacher ? course.teacher : "Not assigned yet"}
							</option>
							{allTeachers.map((teacher) => (
								<option key={teacher.tuser._id} value={teacher.tuser._id}>
									{teacher.tuser.username}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
		</div>
	);
};

export default AssignCourses;
