import React, { useEffect, useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const AdminCourseUpdate = () => {
	const [coursesList, setCourseList] = useState([
		{
			cno: {
				_id: "",
				cname: "ur mom",
				clevel: "",
				cdes: "",
				clec: "",
				status: "",
			},
			suser: { _id: "", username: "" },
		},
	]);

	const fetchData = async () => {
		try {
			const response = await publicApi.post("api/admin/approvalsRequests", {
				token: sessionStorage.getItem("token"),
			});
			console.log(response.data);
			setCourseList(response.data);
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const ApprovalStatusUpdater = async (req) => {
		try {
			const response = await publicApi.post("api/admin/approvalStatusUpdate", {
				token: sessionStorage.getItem("token"),
				userId: req.id,
				course: req.course,
				status: req.status,
			});

			if (response.status === 200) {
				toast.success("Successfully updated");
			} else {
				toast.error(response.data);
			}
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	return (
		<div className="mt-8">
			<h1 className="text-5xl font-bold">Admin Course Update</h1>

			<div className="flex flex-col gap-y-4">
				{coursesList.map((course) => (
					<div className="flex flex-col gap-y-2 text-left">
						<div className="flex flex-col gap-y-2">
							<div>Course Name: {course.cno.cname}</div>
							<div>Course Level: {course.cno.clevel}</div>
							<div>Course Description: {course.cno.cdes}</div>
							{/* <div>Course Duration: {course.cdur.hours}</div> */}
							<div>Course Lectures: {course.cno.clec}</div>
							<div>
								Course Created On:{" "}
								{new Date(course.cno.CrD).toLocaleDateString()}
							</div>
							<div>Requested by: {course.suser.username}</div>
							<div className="status">
								Status: {course.status ? "Approved" : "Waiting"}
							</div>
						</div>
						<div className="flex gap-x-4">
							<button
								className="bg-green-500 text-white px-4 py-2 rounded-lg"
								onClick={() =>
									ApprovalStatusUpdater({
										id: course.suser._id,
										course: course.cno._id,
										status: true,
									})
								}
							>
								Approve
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-lg"
								onClick={() =>
									ApprovalStatusUpdater({
										id: course.suser._id,
										course: course.cno._id,
										status: false,
									})
								}
							>
								Reject
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminCourseUpdate;
