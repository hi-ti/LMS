import React, { useState } from "react";
import publicApi from "../../bearer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const LoginHandler = async () => {
		const response = await publicApi.post("api/auth/login", {
			email: email,
			password: password,
		});

		if (response.status !== 200) {
			toast.error(response.message);
		}

		toast.success("Logged in successfully");
		console.log(response.data);
		sessionStorage.setItem("token", response.data.token);
		// console.log(sessionStorage.getItem("token"));
		navigate("/");
	};
	return (
		<div className="flex flex-col gap-y-4">
			<p className="text-4xl">Login</p>
			<div className="flex">
				<div className="w-1/3"></div>
				<div className="flex flex-col gap-y-4 w-1/3">
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="outline-none border border-black py-2 px-1 rounded-lg"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="outline-none border border-black py-2 px-1 rounded-lg"
					/>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={LoginHandler}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
