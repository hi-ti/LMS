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
		<div className="max-w-lg mx-auto mt-8">
			<h2 className="text-3xl font-bold mb-6">Create a New Course</h2>
			<form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="courseName" className="font-medium">
						Course Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="border border-gray-300 px-3 py-2 rounded-md"
						id="courseName"
						value={courseName}
						onChange={(e) => setCourseName(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="courseLevel" className="font-medium">
						Course Level
					</label>
					<select
						className="border border-gray-300 px-3 py-2 rounded-md"
						id="courseLevel"
						value={courseLevel}
						onChange={(e) => setCourseLevel(e.target.value)}
					>
						<option value="">Select Level</option>
						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
					</select>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="courseDescription" className="font-medium">
						Course Description
					</label>
					<input
						type="text"
						className="border border-gray-300 px-3 py-2 rounded-md"
						id="courseDescription"
						value={courseDescription}
						onChange={(e) => setCourseDescription(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="courseDuration" className="font-medium">
						Course Duration (hrs) <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						className="border border-gray-300 px-3 py-2 rounded-md"
						id="courseDuration"
						value={courseDuration}
						onChange={(e) => setCourseDuration(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="courseLectures" className="font-medium">
						Course Lectures <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						className="border border-gray-300 px-3 py-2 rounded-md"
						id="courseLectures"
						value={courseLectures}
						onChange={(e) => setCourseLectures(e.target.value)}
						required
					/>
				</div>
				<div className="flex justify-center">
					<button
						type="submit"
						className="w-1/4 btn bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CourseCreatorForm;
