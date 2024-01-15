import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../../bearer";

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
		</div>
	);
};

export default CourseDetails;
