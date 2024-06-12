import React, { useState } from "react";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const Signup = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const SignupHandler = async () => {
		try {
			const res = await publicApi.post("api/auth/register", {
				username,
				firstname,
				lastname,
				email,
				password,
			});

			if (res.status === 200) {
				toast.success("Check your email for the verification link");
			} else {
				toast.error("Unable to sign up");
			}
		} catch (error) {
			toast.error("Signup failed. Please try again.");
		}
	};

	return (
		<div className="flex flex-col items-center mt-16">
			<p className="text-5xl font-bold mb-8">Signup</p>
			<div className="w-full max-w-sm flex flex-col gap-y-4">
				<input
					type="text"
					className="w-full outline-none border border-gray-300 py-2 px-4 rounded-lg mb-4 focus:border-blue-500"
					placeholder="First Name"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
				/>
				<input
					type="text"
					className="w-full outline-none border border-gray-300 py-2 px-4 rounded-lg mb-4 focus:border-blue-500"
					placeholder="Last Name"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
				/>
				<input
					type="text"
					className="w-full outline-none border border-gray-300 py-2 px-4 rounded-lg mb-4 focus:border-blue-500"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					className="w-full outline-none border border-gray-300 py-2 px-4 rounded-lg mb-4 focus:border-blue-500"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="w-full outline-none border border-gray-300 py-2 px-4 rounded-lg mb-6 focus:border-blue-500"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="flex justify-center">
				<button
					className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
					onClick={SignupHandler}
				>
					Signup
				</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
