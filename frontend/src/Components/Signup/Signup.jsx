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
		<div className="flex items-center justify-center h-screen bg-custom-dark">
			<div className="w-full max-w-sm bg-custom-light p-8 rounded-lg shadow-lg">
				<p className="text-4xl font-bold mb-8 text-center text-custom-red">Signup</p>
				<div className="flex flex-col gap-y-4">
					<input
						type="text"
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
						placeholder="First Name"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
						placeholder="Last Name"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="flex justify-center">
						<button
							className="w-1/3 bg-inherit border-1 text-custom-red font-bold py-1 px-4 rounded-full hover:bg-custom-red hover:text-custom-light transition duration-200"
							onClick={SignupHandler}
						>
							Signup
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
