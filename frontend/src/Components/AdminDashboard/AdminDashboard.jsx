import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const navigate = useNavigate();

	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);

	const token = sessionStorage.getItem("token");
	const fetchData = async () => {
		try {
			publicApi
				.post("api/admin/teachers", { token: token })
				.then((res) => {
					console.log(res.data);
					setTeachers(res.data);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.message);
				});

			publicApi
				.post("api/admin/students", { token: token })
				.then((res) => {
					setStudents(res.data);
					console.log(res.data)
				})
				.catch((err) => {
					console.log(err);
				});

			publicApi
				.post("api/admin/courses", { token: token })
				.then((res) => {
					setCourses(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const roles = ["student", "teacher"];
	let i = 0;
	return (
		<div className="mt-8 flex flex-col gap-y-8 w-full">
			<h1 className="text-5xl font-bold">Admin Dashboard</h1>

			<div className="flex w-full gap-x-8">
				<div className="w-1/2 h-64 bg-gray-200 rounded-md">
					<div className="flex w-full justify-between">
						<h1 className="text-3xl font-bold">Teachers</h1>
						{/* <button className="bg-black rounded-lg text-white flex items-center justify-center px-2">
							Add Teacher
						</button> */}
					</div>

					<div className="flex flex-col gap-y-4 py-4 px-2">
						{teachers.map((teacher) => {
							console.log(teacher);

							return (<div className="flex flex-row gap-x-4">
								<h1 className="text-xl font-bold">{`${teacher.tuser.firstname} ${teacher.tuser.lastname}`}</h1>
								<h1 className="text-xl font-bold">{teacher.tuser.email}</h1>

								{/* <Select
									items={roles}
									label={""}
									placeholder=""
									className="w-fit font-bold"
								>
									{roles.map((role) => {
										return <SelectItem key={i++}>{role}</SelectItem>;
									})}
								</Select> */}
							</div>
						)})}
					</div>
				</div>
				<div className="w-1/2 h-64 bg-gray-200 rounded-md">
					<div className="flex w-full justify-between">
						<h1 className="text-3xl font-bold">Students</h1>
						{/* <button className="bg-black rounded-lg text-white flex items-center justify-center px-2">
							Add Student
						</button> */}
					</div>

					<div className="flex flex-col gap-y-4 py-4 px-2">
						{students.map((student) => (
							<div className="flex flex-row gap-x-4">
								<h1 className="text-xl font-bold">{`${student.suser.firstname} ${student.suser.lastname}`}</h1>
								<h1 className="text-xl font-bold">{student.suser.email}</h1>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="w-full px-2 py-4 bg-gray-200 rounded-md flex flex-col gap-y-4">
				<div className="flex w-full justify-between">
					<h1 className="text-3xl font-bold">Courses</h1>
					<Link to="/adminDashboard/createCourse">
						<button className="bg-black rounded-lg text-white flex items-center justify-center py-1 px-2">
							Add Course
						</button>
					</Link>
				</div>
				<div className="flex flex-row gap-x-4 gap-y-2 flex-wrap">
					{courses.map((course) => (
						// <Link to={`/course/${course._id}`}>
						<div>
							<div
								className="flex flex-col gap-x-4 rounded-xl bg-black text-white w-72 h-full pt-4 pb-2 pl-3 pr-2 cursor-pointer"
								data-id={course._id}
								onClick={(e) => {
									console.log("normal click");
									console.log(e.target.classList);
									if (e.target.classList.contains("edit")) {
										navigate(
											`/adminDashboard/courseEdit/${e.target.getAttribute(
												"data-id"
											)}`
										);
									} else {
										navigate(
											`/adminDashboard/course/${e.target.getAttribute(
												"data-id"
											)}`
										);
									}
								}}
							>
								<div className="text-left" data-id={course._id}>
									<h1 className="text-xl font-regular" data-id={course._id}>
										Course name: {course.cname}
									</h1>
									{/* <h1 className="text-xl font-regular">
										Course description: {course.cdes}
									</h1> */}
									<h1 className="text-xl font-regular" data-id={course._id}>
										Course level: {course.clevel}
									</h1>
									<h1 className="text-xl font-regular" data-id={course._id}>
										Course lectures: {course.clec}
									</h1>
									<h1 className="text-xl font-regular" data-id={course._id}>
										Course duration: {course.cdur.hours} hrs
									</h1>
									<h1 className="text-xl font-regular" data-id={course._id}>
										Course created on:{" "}
										{new Date(course.CrD).toLocaleDateString()}
									</h1>
								</div>
								<div className="flex justify-end w-full h-full items-end">
									<button
										className="bg-white text-black px-2 py-1 rounded-md edit"
										data-id={course._id}
										// onClick={(e) => {
										// 	e.stopPropagation();
										// }}
									>
										Edit Course
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
