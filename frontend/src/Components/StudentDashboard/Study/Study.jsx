import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import publicApi from "../../../bearer";

const Study = () => {
	const { course, lecture } = useParams();
	const [currLecture, setCurrLecture] = useState("");
	const [lecLink, setLecLink] = useState("");

	const token = sessionStorage.getItem("token");
	const dataFetcher = async () => {
		try {
			const response = await publicApi.post(
				`api/student/studentDashboard/${course}/${lecture}`,
				{ token: token }
			);

			if (response.status === 200) {
				const arr = response.data.leclink.split("watch?v=");
				response.data.leclink = `${arr[0]}embed/${arr[1]}`;
				setLecLink(`${arr[0]}embed/${arr[1]}`);
				setCurrLecture(response.data);
			}
		} catch (e) {
			console.log(e);
			toast.error("Failed to fetch lecture data");
		}
	};

	useEffect(() => {
		dataFetcher();
	}, [course, lecture]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-custom-dark p-8">
			{lecture ? (
				<iframe
					width="1190"
					height="669"
					src={lecLink}
					title="Lecture Video"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="rounded-lg shadow-lg"
				></iframe>
			) : (
				<div className="text-custom-red text-xl">No lecture selected.</div>
			)}
		</div>
	);
};

export default Study;
