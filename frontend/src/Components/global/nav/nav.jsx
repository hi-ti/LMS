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
	}, [signedIn]);
	// console.log(userExists);
	// if (userExists) {
	// 	() => setSignedin(false);
	// } else {
	// 	() => setSignedin(false);
	// }
	// console.log(userExists);
	return (
		<div className="m-0 p-0 flex w-full">
			<div className="flex w-1/6">
				<div className=" w-full font-bold text-2xl text-left">LearnToday</div>
			</div>
			<div className="w-4/6"></div>
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
						<div className=" w-full font-bold text-2xl text-right">
							<a href="/login">Login</a>
						</div>
					</div>
					<div className="flex w-1/6">
						<div className=" w-full font-bold text-2xl text-right">
							<a href="/signup">Signup</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Nav;
