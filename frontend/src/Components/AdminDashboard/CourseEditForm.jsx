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
			className="absolute h-screen w-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
			onClick={(e) => {
				if (!e.target.classList.contains("input")) {
					clickElse(false);
				}
			}}
		>
			<div className="bg-custom-light p-4 rounded-md shadow-md flex flex-col gap-y-2">
				<input
					type="text"
					placeholder="Lecture Name"
					value={name}
					className="py-2 px-3 input border border-gray-600 rounded-md bg-custom-red text-custom-light"
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					placeholder="Description"
					rows={4}
					value={lecDesc}
					className="py-2 px-3 input border border-gray-600 rounded-md bg-custom-red text-custom-light"
					onChange={(e) => setLecDesc(e.target.value)}
				></textarea>
				<input
					type="url"
					placeholder="Link to Lecture"
					value={leclink}
					className="py-2 px-3 input border border-gray-600 rounded-md bg-custom-red text-custom-light"
					onChange={(e) => setLeclink(e.target.value.replace(/ /g, ""))} // remove spaces
				/>
				<button
					className="input bg-blue-600 text-custom-red py-2 px-5 rounded-full mt-2"
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
		<div className="min-h-screen p-8 bg-custom-dark flex justify-center items-center">
			{showModal && (
				<AddLectureModal pushCourse={pushCourse} clickElse={setShowModal} />
			)}
			<div className="max-w-5xl w-full bg-custom-light p-6 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-custom-red">Edit Course</h2>
				<form className="flex flex-col gap-y-4" onSubmit={(e) => { e.preventDefault(); dataUpdater(); }}>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseName" className="font-medium text-custom-red">
							Course Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseName"
							value={course.cname}
							onChange={(e) => setCourse({ ...course, cname: e.target.value })}
							required
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseLevel" className="font-medium text-custom-red">
							Course Level
						</label>
						<select
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseLevel"
							value={course.clevel}
							onChange={(e) => setCourse({ ...course, clevel: e.target.value })}
						>
							<option value="" className="text-gray-600">Select Level</option>
							<option value="Beginner" className="text-gray-600">Beginner</option>
							<option value="Intermediate" className="text-gray-600">Intermediate</option>
							<option value="Advanced" className="text-gray-600">Advanced</option>
						</select>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseDescription" className="font-medium text-custom-red">
							Course Description
						</label>
						<input
							type="text"
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseDescription"
							value={course.cdes}
							onChange={(e) => setCourse({ ...course, cdes: e.target.value })}
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseDuration" className="font-medium text-custom-red">
							Course Duration (hrs) <span className="text-red-500">*</span>
						</label>
						<input
							type="number"
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseDuration"
							value={course.cdur.hours}
							onChange={(e) =>
								setCourse({ ...course, cdur: { hours: +e.target.value } })
							}
							required
						/>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="w-1/4 btn border-1 border-custom-red py-1 px-4 rounded-full font-semibold text-custom-red hover:bg-custom-red hover:text-custom-light transition duration-200"
						>
							Update
						</button>
					</div>
				</form>
				<div className="flex flex-col gap-y-4 mt-6">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold text-custom-red">Lectures</h2>
						<button
							className="bg-blue-600 text-custom-red py-2 px-5 rounded-full"
							onClick={() => setShowModal(true)}
						>
							Add Lecture
						</button>
					</div>
					<div className="bg-gray-800 p-4 rounded-lg h-80 overflow-y-scroll">
						{lectures.map((lecture, index) => (
							<div
								key={lecture._id || index}
								className="flex justify-between items-center mb-2 text-custom-red"
							>
								<span>{lecture.name}</span>
								<button
									className="bg-red-600 text-custom-red py-1 px-5 rounded-full"
									onClick={() => removeLect(lecture._id)}
								>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="text-xl font-semibold mt-8 text-custom-red">
					<div className="mb-4">Students Enrolled:</div>
					{students.length > 0 ? (
						students.map((student) => (
							<div key={student.suser._id} className="mb-2 text-custom-red">
								{student.suser.fname} {student.suser.lname} ({student.suser.email})
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
