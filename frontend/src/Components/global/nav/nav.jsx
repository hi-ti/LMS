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
		<div className="flex items-center justify-between p-4 bg-gray-900 text-custom-red fixed top-0 left-0 right-0">
			<div className="">
				<div className=" w-full font-bold text-2xl text-left">LearnToday</div>
			</div>
			<div className="w-5/6"></div>
			{signedIn ? (
				<>
					<button
						className=" border-1 border-custom-red py-1 px-4 rounded-full font-semibold hover:bg-custom-red hover:text-custom-light transition duration-200"
						onClick={SignOut}
					>
						Signout
					</button>
				</>
			) : (
				<>
					<div className="flex w-1/12">
						<div className="text-custom-red border-1 border-custom-red py-1 px-4 rounded-full font-semibold hover:bg-custom-red hover:text-custom-light transition duration-200">
							<a href="/login">Login</a>
						</div>
					</div>
					<div className="flex w-1/12">
						<div className="text-custom-red border-1 border-custom-red py-1 px-4 rounded-full font-semibold hover:bg-custom-red hover:text-custom-light transition duration-200">
							<a href="/signup">Signup</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Nav;
