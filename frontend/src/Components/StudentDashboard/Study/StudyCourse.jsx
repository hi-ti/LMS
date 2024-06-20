import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import publicApi from "../../../bearer";
import toast from "react-hot-toast";

const StudyCourse = () => {
	const { course } = useParams();
	const [lectures, setLectures] = useState([]);

	const token = sessionStorage.getItem("token");

	const dataFetcher = async () => {
		try {
			const response = await publicApi.post(
				`api/student/studentDashboard/${course}`,
				{ token: token }
			);
			if (response.status === 200) {
				setLectures(response.data);
			}
		} catch (e) {
			toast.error("Failed to fetch lectures");
		}
	};

	useEffect(() => {
		dataFetcher();
	}, [course]);

	return (
		<div className="min-h-screen bg-custom-dark p-8">
			<h1 className="text-5xl font-bold text-custom-red text-center mb-8">All Lectures</h1>
			<div className="flex flex-wrap gap-6 justify-center">
				{lectures.length > 0 ? (
					lectures.map((lecture) => (
						<div key={lecture._id} className="bg-gray-200 py-4 px-6 w-64 rounded-xl shadow-lg">
							<div className="flex flex-col gap-y-2 text-left">
								<div className="text-2xl font-bold">{lecture.name}</div>
								<div className="text-xl font-medium">{lecture.lecDesc}</div>
								<div className="text-xl font-medium">Lec no. {lecture.order}</div>
								<div className="flex flex-col gap-y-1 mt-2">
									<Link
										to={`/course/${lecture.cid._id}`}
										className="underline font-regular text-sm text-blue-500 hover:text-blue-700"
									>
										View Course Details
									</Link>
									<Link
										to={`/studentDashboard/study/${lecture.cid._id}/${lecture._id}`}
										className="underline font-regular text-sm text-blue-500 hover:text-blue-700"
									>
										Watch Lecture
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-center text-xl text-custom-red">No Lectures Found</div>
				)}
			</div>
		</div>
	);
};

export default StudyCourse;
