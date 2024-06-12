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
			<div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-y-2">
				<input
					type="text"
					placeholder="Lecture Name"
					value={name}
					className="py-1 px-2 input border border-gray-300 rounded-md"
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					placeholder="Description"
					rows={4}
					cols={50}
					value={lecDesc}
					className="py-1 px-2 input border border-gray-300 rounded-md"
					onChange={(e) => setLecDesc(e.target.value)}
				></textarea>
				<input
					type="url"
					placeholder="Link to Lecture"
					value={leclink}
					className="py-1 px-2 input border border-gray-300 rounded-md"
					onChange={(e) =>
						setLeclink(
							e.target.value.replace(/ /g, "") // remove spaces
						)
					}
				/>
				<button
					className="input bg-blue-500 text-white px-2 py-1 rounded-md"
					onClick={() => {
						pushCourse({ name, lecDesc, leclink });
						clickElse(false);
					}}
				>
					Add Lecture
				</button>
			</div>
		</div>
	);
};

const CourseEditForm = () => {
	const [showModal, setShowModal] = useState(false);
	const [course, setCourse] = useState({ cdur: { hours: 0 }, clevel: "", cdes: "", cname: "" });
	const [students, setStudents] = useState([]);
	const [lectures, setLectures] = useState([]);

	const { id } = useParams();

	const dataFetcher = async () => {
		try {
			const response = await publicApi.post(`api/admin/course/${id}`, {
				token: sessionStorage.getItem("token"),
			});
			setCourse(response.data.course);
			setStudents(response.data.users);
			setLectures(response.data.lectures);
		} catch (e) {
			toast.error(e.response?.data || "Error fetching course data");
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
			toast.error(e.response?.data?.message || "Error updating course data");
		}
	};

	const removeLect = (lectureId) => {
		const updatedLectures = lectures.filter((lecture) => lecture._id !== lectureId);
		updatedLectures.forEach((lecture, index) => {
			lecture.order = index + 1;
		});
		setLectures(updatedLectures);
	};

	const pushCourse = (data) => {
		const newLecture = {
			cid: course._id,
			name: data.name,
			lecDesc: data.lecDesc,
			leclink: data.leclink,
			order: lectures.length + 1,
		};
		setLectures([...lectures, newLecture]);
	};

	useEffect(() => {
		dataFetcher();
	}, [id]);

	return (
		<div className="relative h-screen p-4">
			{showModal && (
				<AddLectureModal pushCourse={pushCourse} clickElse={setShowModal} />
			)}
			<h1 className="text-5xl font-bold mb-6">Course Editor</h1>
			<div className="container mx-auto">
				<div className="flex">
					<div className="flex flex-col gap-y-4 w-1/2">
						<div className="text-2xl font-semibold mt-8 text-left flex flex-col gap-y-4">
							<div className="flex gap-x-4 items-center">
								<label>Course Name:</label>
								<input
									type="text"
									className="border-black border py-1 text-lg rounded-md outline-none px-1 flex-1"
									value={course.cname}
									onChange={(e) =>
										setCourse({ ...course, cname: e.target.value })
									}
								/>
							</div>
							<div className="flex gap-x-4 items-center">
								<label>Total Lectures:</label>
								<span>{lectures.length}</span>
							</div>
							<div className="flex gap-x-4 items-center">
								<label>Total Hours:</label>
								<input
									type="number"
									className="border-black border py-1 text-lg rounded-md outline-none px-1 flex-1"
									value={course.cdur.hours}
									onChange={(e) =>
										setCourse({ ...course, cdur: { hours: +e.target.value } })
									}
								/>
							</div>
							<div className="flex gap-x-4 items-center">
								<label>Course Level:</label>
								<input
									type="text"
									className="border-black border py-1 text-lg rounded-md outline-none px-1 flex-1"
									value={course.clevel}
									onChange={(e) =>
										setCourse({ ...course, clevel: e.target.value })
									}
								/>
							</div>
							<div className="flex gap-x-4 items-center">
								<label>Created On:</label>
								<span>{new Date(course.CrD).toLocaleDateString()}</span>
							</div>
							<div className="flex gap-x-4 items-center">
								<label>Course Description:</label>
								<input
									type="text"
									className="border-black border py-1 text-lg rounded-md outline-none px-1 flex-1"
									value={course.cdes}
									onChange={(e) =>
										setCourse({ ...course, cdes: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<button
								className="w-1/4 bg-blue-500 text-white py-2 px-4 text-xl rounded-lg mt-4"
								onClick={dataUpdater}
							>
								Update
							</button>
						</div>
					</div>

					<div className="w-1/2 h-80 overflow-y-scroll text-left pl-4">
						<div className="flex justify-between w-full mb-4">
							<h2 className="text-xl font-semibold">Lectures</h2>
							<button
								className="bg-blue-500 text-white px-2 py-1 rounded-lg"
								onClick={() => setShowModal(true)}
							>
								Add Lecture
							</button>
						</div>
						{lectures.map((lecture, index) => (
							<div
								key={lecture._id || index}
								className="flex justify-between items-center mb-2"
							>
								<span>{lecture.name}</span>
								<button
									className="bg-red-500 text-white px-2 py-1 rounded-md"
									onClick={() => removeLect(lecture._id)}
								>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="text-2xl font-semibold mt-8 text-left">
					<div className="mb-4">Students Enrolled:</div>
					{students.length > 0 ? (
						students.map((student) => (
							<div key={student.suser._id} className="flex gap-x-4">
								<div>{student.suser.username}</div>
								<div>{student.suser.email}</div>
							</div>
						))
					) : (
						<div>No students found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseEditForm;