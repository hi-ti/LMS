import React, { useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const CourseCreatorForm = () => {
	const [courseName, setCourseName] = useState("");
	const [courseLevel, setCourseLevel] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [courseDuration, setCourseDuration] = useState("");
	const [courseLectures, setCourseLectures] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!courseName || !courseDuration || !courseLectures) {
			toast.error("Please fill out all required fields.");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await publicApi.post("api/course/add", {
				token: sessionStorage.getItem("token"),
				cname: courseName,
				clevel: courseLevel || undefined,
				cdesc: courseDescription || undefined,
				cdur: courseDuration ? { hours: +courseDuration } : undefined,
				clec: courseLectures ? +courseLectures : undefined,
			});

			if (response.status === 200) {
				toast.success("Successfully created");
				setCourseName("");
				setCourseLevel("");
				setCourseDescription("");
				setCourseDuration("");
				setCourseLectures("");
			} else {
				toast.error(response.data);
			}
		} catch (e) {
			toast.error(e.response?.data || "Error creating course");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="min-h-screen p-8 bg-custom-dark flex justify-center items-center">
			<div className="max-w-lg w-full bg-custom-light p-6 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-custom-red">Create a New Course</h2>
				<form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseName" className="font-medium text-custom-red">
							Course Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseName"
							value={courseName}
							onChange={(e) => setCourseName(e.target.value)}
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
							value={courseLevel}
							onChange={(e) => setCourseLevel(e.target.value)}
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
							value={courseDescription}
							onChange={(e) => setCourseDescription(e.target.value)}
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
							value={courseDuration}
							onChange={(e) => setCourseDuration(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="courseLectures" className="font-medium text-custom-red">
							Course Lectures <span className="text-red-500">*</span>
						</label>
						<input
							type="number"
							className="border border-gray-600 px-3 py-2 rounded-md bg-custom-red text-custom-light"
							id="courseLectures"
							value={courseLectures}
							onChange={(e) => setCourseLectures(e.target.value)}
							required
						/>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="w-1/4 btn border-1 border-custom-red py-1 px-4 rounded-full font-semibold text-custom-red hover:bg-custom-red hover:text-custom-light transition duration-200"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CourseCreatorForm;
