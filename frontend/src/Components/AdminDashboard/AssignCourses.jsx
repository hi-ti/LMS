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
				console.log(response.data);
				setCourses(response.data.courses);
				setAllTeachers(response.data.allTeachers);
			}
		} catch (e) {
			toast.error(response.data);
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
			}
		} catch (e) {
			toast.error("Error assigning");
		}
	};
	return (
		<div>
			<div className="text-5xl font-bold">Assign Courses</div>

			<div className="flex flex-col gap-y-4 text-left">
				{courses.map((course) => (
					<>
						<h1 className="text-2xl font-bold">{course.cname}</h1>
						<select
							onChange={(event) => handleSelect(event, course)}
							className={"bg-gray-200 w-72 py-1 px-2"}
						>
							<option value={course.teacher ? course.teacherId : "null"}>
								{course.teacher ? course.teacher : "Not assigned yet"}
							</option>
							{allTeachers.map((teacher) => {
								return (
									<>
										{course.teacherId !== teacher.tuser._id ? (
											<option value={teacher.tuser._id}>
												{teacher.tuser.username}
											</option>
										) : (
											<></>
										)}
									</>
								);
							})}
						</select>
					</>
				))}
			</div>
		</div>
	);
};

export default AssignCourses;
