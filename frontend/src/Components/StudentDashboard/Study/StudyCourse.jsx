import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../../../bearer";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const StudyCourse = () => {
	const { course } = useParams();
	const [lectures, setLectures] = useState([]);

	const token = sessionStorage.getItem("token");
	const dataFetcher = async () => {
		try {
			const response = await publicApi.post(
				`api/student/studentDashboard/${course}`,
				{
					token: token,
				}
			);
			console.log(response);

			if (response.status === 200) {
				setLectures(response.data);
			}
		} catch (e) {
			toast.error(e.response.data);
		}
	};

	useEffect(() => {
		dataFetcher();
	}, []);
	return (
		<div>
			<div className="text-5xl font-bold">All Lectures</div>

			<div className="flex gap-x-2 flex-wra mt-8">
				{lectures.map((course) => {
					return (
						<>
							<div className="bg-gray-200 py-4 px-2 w-64 rounded-xl">
								<div className="flex flex-col gap-y-2 text-left">
									<div className="text-2xl font-bold">{course.name}</div>
									<div className="text-xl font-medium">{course.lecDesc}</div>
									<div className="text-xl font-medium">
										Lec no. {course.order}
									</div>

									<div className="flex flex-col gap-y-1">
										<Link
											to={`/course/${course.cid._id}`}
											className="underline font-regular text-sm"
										>
											View Course Details
										</Link>

										<Link
											to={`/studentDashboard/study/${course.cid._id}/${course._id}`}
											className="underline font-regular text-sm"
										>
											Watch Lecture
										</Link>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default StudyCourse;
