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

			console.log(response.data);
			if (response.status === 200) {
				const arr = response.data.leclink.split("watch?v=");
				response.data.leclink = `${arr[0]}embed/${arr[1]}`;
				console.log(arr);
				setLecLink(`${arr[0]}embed/${arr[1]}`);
				setCurrLecture(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		dataFetcher();
	}, []);

	return (
		<div>
			{lecture ? (
				<iframe
					width="1190"
					height="669"
					src={lecLink}
					title="@Kullubaazi and @SamayRainaOfficial REACT to Killer Soup Trailer | Netflix India"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			) : (
				<></>
			)}
		</div>
	);
};

export default Study;
