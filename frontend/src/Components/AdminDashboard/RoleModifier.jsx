import React, { useState, useEffect, useCallback } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

const RoleModifier = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const token = sessionStorage.getItem("token");

	const fetchData = async () => {
		try {
			const response = await publicApi.post("api/admin/getAllUsers", {
				token: token,
			});
			setAllUsers(response.data);
		} catch (e) {
			toast.error(e.response?.data || "Error fetching users");
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
				setAllUsers((prevUsers) =>
					prevUsers.map((user) =>
						user._id === req.id ? { ...user, role: req.role } : user
					)
				);
			} else {
				toast.error(response.data);
			}
		} catch (e) {
			toast.error(e.response?.data || "Error updating role");
		}
	};

	const handleSearch = useCallback(
		debounce((query) => {
			setSearchQuery(query);
		}, 300),
		[]
	);

	useEffect(() => {
		fetchData();
	}, []);

	const filteredUsers = allUsers.filter((user) =>
		user.username.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<h1 className="text-5xl font-bold">Role Modifier</h1>

			<div className="flex flex-col gap-y-4 mt-8">
				<input
					type="search"
					placeholder="Search by username"
					className="outline-none border border-black px-3 py-1 rounded-lg"
					onChange={(e) => handleSearch(e.target.value)}
				/>
				{filteredUsers.map((user) => (
					<div key={user._id} className="flex gap-x-4 items-center">
						<div className="w-72 flex justify-start px-16">{user.username}</div>
						<div className="w-72 flex justify-start px-16">{user.email}</div>
						<div className="w-72 flex justify-start px-16">{user.role}</div>
						{user.role === "student" ? (
							<>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "teacher" })}
								>
									Convert to Teacher
								</button>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "admin" })}
								>
									Convert to Admin
								</button>
							</>
						) : user.role === "teacher" ? (
							<>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "student" })}
								>
									Convert to Student
								</button>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "admin" })}
								>
									Convert to Admin
								</button>
							</>
						) : (
							<>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "student" })}
								>
									Convert to Student
								</button>
								<button
									className="btn bg-black text-custom-red py-1 px-5 rounded-full"
									onClick={() => RoleUpdater({ id: user._id, role: "teacher" })}
								>
									Convert to Teacher
								</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default RoleModifier;
