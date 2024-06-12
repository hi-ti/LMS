import React, { useState } from "react";
import publicApi from "../../bearer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const LoginHandler = async () => {
		try {
			const response = await publicApi.post("api/auth/login", {
				email,
				password,
			});

			if (response.status !== 200) {
				toast.error(response.data.message);
				return;
			}

			toast.success("Logged in successfully");
			sessionStorage.setItem("token", response.data.token);
			navigate("/");
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
		}
	};

	return (
		<div className="flex flex-col items-center mt-16">
			<p className="text-4xl font-bold mb-8">Login</p>
			<div className="w-full max-w-sm">
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4 outline-none focus:border-blue-500"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-6 outline-none focus:border-blue-500"
				/>
				<button
					onClick={LoginHandler}
					className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
