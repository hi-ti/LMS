import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const CourseDetails = () => {
	const { id } = useParams();
	const [data, setData] = useState({ cdur: 0 });

	console.log(id);
	const fetchData = async (req, res) => {
		const response = await publicApi.post("api/course/details", { cid: id });
		console.log(response.data);
		setData(response.data);
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const sendRegisterRequest = async () => {
		try {
			const response = await publicApi.post("api/student/addCourseRequest", {
				data: { cid: id },
				token: sessionStorage.getItem("token"),
			});
			// console.log(response.data);

			if (response.status === 200) {
				toast.success("Successfully requested");
			} else {
				console.log(response.data);
				toast.error(response.data);
			}
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	return (
		<div className="text-left text-2xl font-semibold mt-8">
			<div className="CourseName">Course Name: {data.cname}</div>
			<div className="CourseName">Total Lectures: {data.clec}</div>
			<div className="CourseName">Total Hours: {data.cdur.hours}</div>
			<div className="CourseName">Course Level: {data.clevel}</div>
			<div className="CourseName">
				Created On: {new Date(data.CrD).toLocaleDateString()}
			</div>
			<div className="CourseDesc">Course Description: {data.cdes}</div>
			<button
				className="btn bg-black text-white px-4 py-2 rounded-lg"
				onClick={sendRegisterRequest}
			>
				Join Now
			</button>
		</div>
	);
};

export default CourseDetails;
