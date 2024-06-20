import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const navigate = useNavigate();

	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		try {
			const teachersRes = await publicApi.post("api/admin/teachers", { token });
			setTeachers(teachersRes.data);

			const studentsRes = await publicApi.post("api/admin/students", { token });
			setStudents(studentsRes.data);

			const coursesRes = await publicApi.post("api/admin/courses", { token });
			setCourses(coursesRes.data);
		} catch (err) {
			console.log(err);
			toast.error(err.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="min-h-screen mt-16 p-8 bg-custom-dark">
			<h1 className="text-5xl font-bold mb-8 text-custom-red">Admin Dashboard</h1>

			<div className="bg-custom-light p-6 rounded-lg shadow mt-8 mb-8">
				<div className="flex justify-between mb-4">
					<h2 className="text-3xl font-bold text-custom-red">Courses</h2>
					<Link to="/adminDashboard/createCourse">
						<button className="bg-inherit border-1 text-custom-red py-1 px-4 rounded-full hover:bg-custom-red hover:text-custom-light transition duration-200">Add Course</button>
					</Link>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{courses.map((course) => (
						<div
							key={course._id}
							className="bg-custom-red px-2 py-2 rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105"
							onClick={() => navigate(`/adminDashboard/course/${course._id}`)}
						>
							<h3 className="text-lg font-semibold text-gray-950">{course.cname}</h3>
							<p className="text-gray-950">Level: {course.clevel}</p>
							<p className="text-gray-950">Lectures: {course.clec}</p>
							<p className="text-gray-950">Duration: {course.cdur.hours} hrs</p>
							<p className="text-gray-950">Created on: {new Date(course.CrD).toLocaleDateString()}</p>
							<div className="flex justify-center mt-4">
								<button
									className="border-1 border-custom-dark text-custom-dark py-1 px-5 rounded-full hover:bg-custom-light hover:text-custom-red transition duration-200"
									onClick={(e) => {
										e.stopPropagation();
										navigate(`/adminDashboard/courseEdit/${course._id}`);
									}}
								>
									Edit Course
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-custom-light p-6 rounded-lg shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-3xl font-bold text-custom-red">Teachers</h2>
					</div>
					<div className="space-y-4">
						{teachers.map((teacher) => (
							<div key={teacher.tuser.email} className="flex justify-between items-center cursor-pointer transition-transform transform hover:scale-105">
								<p className="text-lg text-custom-red">{`${teacher.tuser.firstname} ${teacher.tuser.lastname}`}</p>
								<p className="text-lg text-custom-red">{teacher.tuser.email}</p>
							</div>
						))}
					</div>
				</div>

				<div className="bg-custom-light p-6 rounded-lg shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-3xl font-bold text-custom-red">Students</h2>
					</div>
					<div className="space-y-4">
						{students.map((student) => (
							<div key={student.suser.email} className="flex justify-between items-center cursor-pointer transition-transform transform hover:scale-105">
								<p className="text-lg text-custom-red">{`${student.suser.firstname} ${student.suser.lastname}`}</p>
								<p className="text-lg text-custom-red">{student.suser.email}</p>
							</div>
						))}
					</div>
				</div>
			</div>

		</div>
	);
};

export default AdminDashboard;
