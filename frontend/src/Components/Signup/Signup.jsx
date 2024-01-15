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
		const res = await publicApi.post("api/auth/register", {
			username,
			firstname,
			lastname,
			email,
			password,
		});

		if (res.status === 200) {
			toast.success("Check your email for verification link");
		} else {
			toast.error("Unable to singup");
		}
	};
	return (
		<div className="flex flex-col gap-y-4">
			<div className="text-5xl font-bold">Signup</div>

			<div className="flex">
				<div className="w-1/3"></div>
				<div className="inputs flex flex-col gap-y-4 w-1/3">
					<input
						type="text"
						className="outline-none border border-black py-2 px-1 rounded-lg"
						placeholder="First Name"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none border border-black py-2 px-1 rounded-lg"
						placeholder="Last Name"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none border border-black py-2 px-1 rounded-lg"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="text"
						className="outline-none border border-black py-2 px-1 rounded-lg"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="outline-none border border-black py-2 px-1 rounded-lg"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* <input type="text" className="fname" placeholder="Password" /> */}
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
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
