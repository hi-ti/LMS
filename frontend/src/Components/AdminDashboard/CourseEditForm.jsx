import React, { useEffect, useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AddLectureModal = ({ pushCourse, clickElse }) => {
	const [name, setName] = useState("");
	const [lecDesc, setLecDesc] = useState("");
	const [leclink, setLeclink] = useState("");

	return (
		<div
			className="absolute h-screen w-full bg-black bg-opacity-50 z-20 flex justify-center items-center text-left"
			onClick={(e) => {
				if (!e.target.classList.contains("input")) {
					clickElse(false);
				}
			}}
		>
			<div className="flex flex-col gap-y-2">
				<input
					type="text"
					placeholder="Lecture Name"
					value={name}
					className="py-1 px-2 input"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<textarea
					placeholder="Description"
					rows={4}
					cols={50}
					value={lecDesc}
					className="py-1 px-2 input"
					onChange={(e) => setLecDesc(e.target.value)}
				></textarea>
				<br />
				<input
					type="url"
					placeholder="Link to Lecture"
					value={leclink}
					className="py-1 px-2 input"
					onChange={(e) =>
						setLeclink(
							e.target.value.replace(/ /g, "") // remove spaces'
						)
					}
				/>
				<button
					className="input bg-white text-black px-2 py-1"
					onClick={() => pushCourse({ name, lecDesc, leclink })}
				>
					Add Lecture
				</button>
			</div>
		</div>
	);
};

const CourseEditForm = () => {
	const [showModal, setShowModal] = useState(false);

	const [course, setCourse] = useState({ cdur: { hours: 0 } });
	const [teachers, setTeachers] = useState({
		name: "",
	});
	const [students, setStudents] = useState([]);
	const [lectures, setLectures] = useState([
		{
			name: "",
			lecDesc: "",
			lecLink: "",
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
		try {
			const response = await publicApi.post(`api/teacher/courseEdit/${id}`, {
				cid: id,
				courseDetails: course,
				newLectures: lectures,
				token: token,
			});

			if (response.status === 200) {
				toast.success("Updated Course Data");
			}
		} catch (e) {
			console.log(e);
			toast.error(response.data.message);
		}
	};

	const removeLect = (id) => {
		console.log(id);
		let newArr = lectures;
		let index = newArr.findIndex((x) => x._id == id);
		newArr.splice(index, 1);
		console.log(newArr);
		for (var i = 0; i < newArr.length; i++) {
			newArr[i].order = i + 1;
		}
		console.log(newArr);
		setLectures([...newArr]);

		// console.log(lectures);
	};

	const pushCourse = (data) => {
		console.log(data);
		const newArray = lectures;
		newArray.push({
			cid: course._id,
			name: data.name,
			lecDesc: data.lecDesc,
			leclink: data.leclink,
			order: lectures.length + 1,
		});

		setLectures([...newArray]);
	};

	useEffect(() => {
		dataFetcher();
		// console.log(course);

		// sort lectures objects according to value of order
		// lectures.sort((a, b) => a.order - b.order);
		// console.log(lectures);
	}, []);

	useEffect(() => {
		// sort lectures array using
	}, [lectures]);

	return (
		<div className=" relative h-screen">
			{showModal ? (
				<>
					<AddLectureModal pushCourse={pushCourse} clickElse={setShowModal} />
				</>
			) : (
				<></>
			)}
			<div className="text-5xl font-bold">Course Editor</div>
			<div className="container mx-auto">
				<div className="flex">
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
							<div className="CourseName">
								Total Lectures: {lectures.length}
							</div>
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
						<div
							className="updatebtn bg-black text-white py-1 px-3 text-xl w-fit rounded-lg"
							onClick={dataUpdater}
						>
							{" "}
							Update
						</div>
					</div>

					<div className="w-1/2 h-80 overflow-y-scroll text-left">
						{/* <LectureForm /> */}
						<div className="flex justify-between w-full">
							<div className="text-xl font-semibold">Courses</div>
							<button
								className="addLec bg-black text-white px-2 py-0.5 rounded-lg"
								onClick={() => setShowModal(true)}
							>
								Add Lecture
							</button>
						</div>
						<div className="flex gap-x-1  gap-y-1 flex-wrap w-48">
							{lectures.map((e) => {
								console.log(e);
								console.log(e.cid);
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
			</div>
			{/* Showing Modal */}

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
