import React, { useEffect, useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CourseEditForm = () => {
	const [course, setCourse] = useState({ cdur: { hours: 0 } });
	const [teachers, setTeachers] = useState({
		name: "",
	});
	const [students, setStudents] = useState([]);
	const [lectures, setLectures] = useState([
		{
			name: "",
			lecDesc: "",
			leclink: "",
			order: 1,
		},
	]);

	const { id } = useParams();

	const dataFetcher = async () => {
		try {
			const response = await publicApi.post(`api/admin/course/${id}`, {
				token: sessionStorage.getItem("token"),
			});
			console.log(response);
			setCourse(response.data.course);
			console.log(course);
			setStudents(response.data.users);
			setLectures(response.data.lectures);
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	const token = sessionStorage.getItem("token");
	const dataUpdater = async () => {
		await publicApi.post(`api/teacher/courseEdit/${id}`, {
			cid: id,
			courseDetails: course,
			newLectures: lectures,
			token: token,
		});
	};

	const removeLect = (id) => {
		console.log(id);
		let newArr = lectures;
		let index = newArr.findIndex((x) => x.order == id);
		newArr.splice(index, 1);
		console.log(newArr);
		for (var i = index; i < newArr.length; i++) {
			newArr[i].order -= 1;
		}
		console.log(newArr);
		setLectures([...newArr]);

		// console.log(lectures);
	};

	useEffect(() => {
		dataFetcher();
		// console.log(course);

		// sort lectures objects according to value of order
		lectures.sort((a, b) => a.order - b.order);
		console.log(lectures);
	}, []);

	return (
		<div className="w-full">
			<div className="text-5xl font-bold">Course Editor</div>

			<div className="flex w-full">
				<div className="flex flex-col gap-y-4 w-1/2">
					<div className="text-2xl font-semibold mt-8 text-left flex flex-col gap-y-4">
						<div className="CourseName flex gap-x-4">
							Course Name:{" "}
							<input
								type="text"
								className="border-black border py-1 text-lg rounded-md outline-none px-1"
								placeholder={course.cname}
							/>
						</div>
						<div className="CourseName">Total Lectures: {lectures.length}</div>
						<div className="CourseName flex gap-x-4">
							Total Hours:{" "}
							<input
								type="text"
								className="border-black border py-1 text-lg rounded-md outline-none px-1"
								placeholder={course.cdur.hours}
							/>
						</div>
						<div className="CourseName flex gap-x-4">
							Course Level:{" "}
							<input
								type="text"
								className="border-black border py-1 text-lg rounded-md outline-none px-1"
								placeholder={course.clevel}
							/>
						</div>
						<div className="CourseName flex gap-x-4">
							Created On: {new Date(course.CrD).toLocaleDateString()}
						</div>
						<div className="CourseDesc flex gap-x-4">
							Course Description:{" "}
							<input
								type="text"
								className="border-black border py-1 text-lg rounded-md outline-none px-1"
								placeholder={course.cdes}
							/>
						</div>
					</div>
					<div className="updatebtn bg-black text-white py-1 px-3 text-xl w-fit rounded-lg">
						{" "}
						Update
					</div>
				</div>

				<div className="w-1/2 h-80 overflow-y-scroll">
					{/* <LectureForm /> */}
					Add lectures
					<div className="flex gap-x-1  gap-y-1 flex-wrap w-48">
						{lectures.map((e) => {
							console.log(e);
							return (
								// <LectureCard key={e._id}
								<div className="flex flex-col gap-y-1">
									<div className="lecture flex gap-x-1 items-center">
										<div className="name w-24 text-left">{e.name}</div>
										<button
											className="bg-black text-white px-2 py-1 w-64 rounded-md"
											onClick={() => removeLect(e._id)}
										>
											Remove Lect
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div className="text-2xl font-semibold mt-8 text-left">
				<div className="CourseName">Students Enrolled: </div>
				{students.length > 0 ? (
					students.map((student) => (
						<div className="flex gap-x-4">
							<div className="CourseName">{student.suser.username}</div>
							<div className="CourseName">{student.suser.email}</div>
						</div>
					))
				) : (
					<>No Form Found</>
				)}
			</div>
		</div>
	);
};

export default CourseEditForm;
