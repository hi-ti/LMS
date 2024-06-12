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
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-4xl font-semibold mb-8 text-gray-800">Admin Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-gray-700">Teachers</h2>
					</div>
					<div className="space-y-4">
						{teachers.map((teacher) => (
							<div key={teacher.tuser.email} className="flex justify-between items-center">
								<p className="text-lg text-gray-600">{`${teacher.tuser.firstname} ${teacher.tuser.lastname}`}</p>
								<p className="text-lg text-gray-600">{teacher.tuser.email}</p>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-gray-700">Students</h2>
					</div>
					<div className="space-y-4">
						{students.map((student) => (
							<div key={student.suser.email} className="flex justify-between items-center">
								<p className="text-lg text-gray-600">{`${student.suser.firstname} ${student.suser.lastname}`}</p>
								<p className="text-lg text-gray-600">{student.suser.email}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-lg shadow mt-8">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold text-gray-700">Courses</h2>
					<Link to="/adminDashboard/createCourse">
						<button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add Course</button>
					</Link>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{courses.map((course) => (
						<div
							key={course._id}
							className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
							onClick={() => navigate(`/adminDashboard/course/${course._id}`)}
						>
							<h3 className="text-lg font-semibold text-gray-800">{course.cname}</h3>
							<p className="text-gray-600">Level: {course.clevel}</p>
							<p className="text-gray-600">Lectures: {course.clec}</p>
							<p className="text-gray-600">Duration: {course.cdur.hours} hrs</p>
							<p className="text-gray-600">Created on: {new Date(course.CrD).toLocaleDateString()}</p>
							<div className="flex justify-center mt-4">
								<button
									className="bg-blue-600 text-white py-1 px-3 rounded-lg"
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
		</div>
	);
};

export default AdminDashboard;
