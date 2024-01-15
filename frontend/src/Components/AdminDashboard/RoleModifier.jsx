import React, { useState, useEffect } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const RoleModifier = () => {
	const [allUsers, setAllUsers] = useState([]);
	let tempData;

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		try {
			console.log(token);
			const response = await publicApi.post("api/admin/getAllUsers", {
				token: token,
			});

			console.log(response.data);
			// tempData = response.data;
			setAllUsers(response.data);
		} catch (e) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	const RoleUpdater = async (req) => {
		try {
			const response = await publicApi.post("api/admin/roleModify", {
				token: sessionStorage.getItem("token"),
				id: req.id,
				role: req.role,
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

	const filteredSearch = (NameFilter) => {
		// if nameFilter is empty
		if (NameFilter === "") {
			// this gives error if i set it to tempData
			// setAllUsers(allUsers);
			fetchData();
		}
		const filteredData = allUsers.filter((user) => {
			return user.username.toLowerCase().includes(NameFilter.toLowerCase());
		});
		setAllUsers(filteredData);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<h1 className="text-5xl font-bold">Role Modifier</h1>

			<div className="flex flex-col gap-y-4 mt-8">
				{/* <div className="flex">
					<div>Name</div>
					<div>Email</div>
					<div>Role</div>
				</div> */}
				<input
					type="search"
					placeholder="search by username"
					className="outline-none border border-black px-3 py-1 rounded-lg"
					onChange={(e) => filteredSearch(e.target.value)}
				/>
				{allUsers.map((user) => (
					<div className="flex gap-x-4 items-center">
						<di className="w-72 flex justify-start px-16">{`${user.username}`}</di>
						<div className="w-72 flex justify-start px-16">{user.email}</div>
						<div className="w-72 flex justify-start px-16">{user.role}</div>
						{user.role == "student" ? (
							<>
								<button
									className="btn bg-black text-white px-3 py-2 rounded-lg"
									onClick={() => RoleUpdater({ id: user._id, role: "teacher" })}
								>
									Convert to Teacher
								</button>
								<button
									className="btn bg-black text-white px-3 py-2 rounded-lg"
									onClick={() => RoleUpdater({ id: user._id, role: "admin" })}
								>
									Convert to Admin
								</button>
							</>
						) : (
							<>
								{user.role == "teacher" ? (
									<>
										<button
											className="btn bg-black text-white px-3 py-2 rounded-lg"
											onClick={() =>
												RoleUpdater({ id: user._id, role: "student" })
											}
										>
											Convert to Student
										</button>
										<button
											className="btn bg-black text-white px-3 py-2 rounded-lg"
											onClick={() =>
												RoleUpdater({ id: user._id, role: "admin" })
											}
										>
											Convert to Admin
										</button>
									</>
								) : (
									<>
										<button
											className="btn bg-black text-white px-3 py-2 rounded-lg"
											onClick={() =>
												RoleUpdater({ id: user._id, role: "student" })
											}
										>
											Convert to Student
										</button>
										<button
											className="btn bg-black text-white px-3 py-2 rounded-lg"
											onClick={() =>
												RoleUpdater({ id: user._id, role: "teacher" })
											}
										>
											Convert to Teacher
										</button>
									</>
								)}
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default RoleModifier;
