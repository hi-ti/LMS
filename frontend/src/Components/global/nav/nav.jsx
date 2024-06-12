import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Nav = () => {
	const [signedIn, setSignedin] = useState(false);

	const SignOut = () => {
		sessionStorage.removeItem("token");
		setSignedin(false);
		toast.success("Signed out successfully");
	};

	const userExists = sessionStorage.getItem("token");

	useEffect(() => {
		if (userExists) {
			setSignedin(true);
		} else {
			setSignedin(false);
		}
	}, [userExists]);
	return (
		<div className="flex items-center justify-between p-4 bg-gray-800 text-white fixed top-0 left-0 right-0">
			<div className="">
				<div className=" w-full font-bold text-2xl text-left">LearnToday</div>
			</div>
			<div className="w-11/12"></div>
			{signedIn ? (
				<>
					<button
						className=" w-full font-bold text-2xl text-right"
						onClick={SignOut}
					>
						Signout
					</button>
				</>
			) : (
				<>
					<div className="flex w-1/6">
						<div className=" bg-blue-600 py-2 px-4 rounded-lg font-semibold">
							<a href="/login">Login</a>
						</div>
					</div>
					<div className="flex w-1/6">
						<div className="bg-green-600 py-2 px-4 rounded-lg font-semibold">
							<a href="/signup">Signup</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Nav;
