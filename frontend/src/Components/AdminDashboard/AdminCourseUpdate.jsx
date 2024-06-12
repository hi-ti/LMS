import React, { useEffect, useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const AdminCourseUpdate = () => {
	const [coursesList, setCourseList] = useState([]);

	const fetchData = async () => {
		try {
			const response = await publicApi.post("api/admin/approvalsRequests", {
				token: sessionStorage.getItem("token"),
			});
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
				fetchData();  // Refresh data after update
			} else {
				toast.error(response.data);
			}
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	return (
		<div className="min-h-screen mt-16 bg-gray-50 p-8">
			<h1 className="text-4xl font-semibold mb-8 text-gray-800">Admin Course Update</h1>
			<div className="space-y-6">
				{coursesList.map((course) => (
					<div key={course.cno._id} className="bg-white p-6 rounded-lg shadow-lg">
						<div className="space-y-2">
							<p className="text-xl font-medium text-gray-700">Course Name: {course.cno.cname}</p>
							<p className="text-lg text-gray-600">Level: {course.cno.clevel}</p>
							<p className="text-lg text-gray-600">Description: {course.cno.cdes}</p>
							<p className="text-lg text-gray-600">Lectures: {course.cno.clec}</p>
							<p className="text-lg text-gray-600">Created On: {new Date(course.cno.CrD).toLocaleDateString()}</p>
							<p className="text-lg text-gray-600">Requested by: {course.suser.username}</p>
							<p className={`text-lg font-semibold ${course.status ? 'text-green-600' : 'text-yellow-600'}`}>
								Status: {course.status ? "Approved" : "Waiting"}
							</p>
						</div>
						<div className="flex space-x-4 mt-4">
							<button
								className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
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
								className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
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
