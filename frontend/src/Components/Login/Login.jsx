import React, { useState } from "react";
import publicApi from "../../bearer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const LoginHandler = async () => {
		try {
			const response = await publicApi.post("api/auth/login", {
				email: email,
				password: password,
			});

			if (response.status !== 200) {
				toast.error(response.message);
				return;
			}

			toast.success("Logged in successfully");
			console.log(response.data);
			sessionStorage.setItem("token", response.data.token);
			navigate("/");
		} catch (error) {
			toast.error("Login failed. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-custom-dark">
			<div className="w-full max-w-sm bg-custom-light p-8 rounded-lg shadow-lg">
				<p className="text-4xl font-bold mb-8 text-center text-custom-red">Login</p>
				<div className="flex flex-col gap-y-4">
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="outline-none bg-inherit border border-gray-300 py-2 px-4 rounded-lg focus:bg-custom-red"
					/>
					<div className="flex justify-center">
					<button
						className="w-1/3 bg-inherit border-1 text-custom-red font-bold py-1 px-4 rounded-full hover:bg-custom-red hover:text-custom-light transition duration-200"
						onClick={LoginHandler}
					>
						Login
					</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
