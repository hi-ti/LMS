import React, { useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const CourseCreatorForm = () => {
	const [courseName, setCourseName] = useState("");
	const [courseLevel, setCourseLevel] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [courseDuration, setCourseDuration] = useState("");
	const [courseLectures, setCourseLectures] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await publicApi.post("api/course/add", {
				token: sessionStorage.getItem("token"),
				cname: courseName,
				clevel: courseLevel ? courseLevel : undefined,
				cdesc: courseDescription ? courseDescription : undefined,
				cdur: courseDuration ? courseDuration : undefined,
				clec: courseLectures ? courseLectures : undefined,
			});

			if (response.status === 200) {
				toast.success("Successfully created");
			} else {
				console.log(response.data);
				// toast.error(response);
			}
		} catch (e) {
			console.log(e);
			// toast.error(e.response.data);
		}
	}

	return (
		<div className="text-left mt-8">
			<h2 className="text-5xl font-bold">Create a new course</h2>
			<form className="flex flex-col gap-y-2">
				<div className="flex gap-x-4 items-center">
					<label htmlFor="courseName" className="w-40">
						Course Name
					</label>
					<input
						type="text"
						className="border border-black px-2 py-1 rounded-md"
						id="courseName"
						placeholder="Enter course name"
						onChange={(e) => setCourseName(e.target.value)}
					/>
				</div>
				<div className="flex gap-x-4 items-center">
					<label htmlFor="courseLevel" className="w-40">
						Course Level
					</label>
					<input
						type="text"
						className="border border-black px-2 py-1 rounded-md"
						id="courseLevel"
						placeholder="Enter course level"
						onChange={(e) => setCourseLevel(e.target.value)}
					/>
				</div>
				<div className="flex gap-x-4 items-center">
					<label htmlFor="courseDescription" className="w-40">
						Course Description
					</label>
					<input
						type="text"
						className="border border-black px-2 py-1 rounded-md"
						id="courseDescription"
						placeholder="Enter course description"
						onChange={(e) => setCourseDescription(e.target.value)}
					/>
				</div>
				<div className="flex gap-x-4 items-center">
					<label htmlFor="courseDuration" className="w-40">
						Course Duration
					</label>
					<input
						type="text"
						className="border border-black px-2 py-1 rounded-md"
						id="courseDuration"
						placeholder="Enter course duration in hrs"
						onChange={(e) => setCourseDuration({ hours: +e.target.value })}
					/>
				</div>
				<div className="flex gap-x-4 items-center">
					<label htmlFor="courseLectures" className="w-40">
						Course Lectures
					</label>
					<input
						type="text"
						className="border border-black px-2 py-1 rounded-md"
						id="courseLectures"
						placeholder="Enter course lectures"
						onChange={(e) => setCourseLectures(+e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="btn bg-black text-white px-4 py-2 w-fit rounded-xl"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CourseCreatorForm;
