import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./Components/Courses/Courses.jsx";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Courses />} />
					{/* <Route path="/about" element={<About />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
