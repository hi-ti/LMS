import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./Components/Courses/Courses.jsx";
import "./App.css";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";

function App() {
	const [count, setCount] = useState(0);

	const token = sessionStorage.getItem("token");
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Courses />} />
					<Route exact path="/course">
						<Route exact path=":id" element={<>123213</>} />
					</Route>

					{token ? (
						<></>
					) : (
						<>
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
						</>
					)}
					{/* <Route path="/about" element={<About />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
