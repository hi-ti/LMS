import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./Components/Courses/Courses.jsx";
import "./App.css";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import CourseDetails from "./Components/CourseDetails/CourseDetails.jsx";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import AdminCourseUpdate from "./Components/AdminDashboard/AdminCourseUpdate.jsx";
import RoleModifier from "./Components/AdminDashboard/RoleModifier.jsx";
import CourseCreatorForm from "./Components/AdminDashboard/CourseCreatorForm.jsx";
import CourseEditForm from "./Components/AdminDashboard/CourseEditForm.jsx";
import TeacherDashboard from "./Components/TeacherDashboard/TeacherDashboard.jsx";
import AssignCourses from "./Components/AdminDashboard/AssignCourses.jsx";

function App() {
	const [count, setCount] = useState(0);

	const token = sessionStorage.getItem("token");
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Courses />} />
					<Route exact path="/course">
						<Route exact path=":id" element={<CourseDetails />} />
					</Route>

					{token ? (
						<>
							<Route
								exact
								path="/studentDashboard"
								element={<StudentDashboard />}
							/>
							<Route
								exact
								path="/adminDashboard"
								element={<AdminDashboard />}
							/>
							<Route
								exact
								path="/adminDashboard/approvals"
								element={<AdminCourseUpdate />}
							/>
							<Route
								exact
								path="/adminDashboard/roleModifier"
								element={<RoleModifier />}
							/>
							<Route
								exact
								path="/adminDashboard/createCourse"
								element={<CourseCreatorForm />}
							/>
							<Route
								exact
								path="/adminDashboard/courseEdit/:id"
								element={<CourseEditForm />}
							/>
							<Route
								exact
								path="/teacherDashboard"
								element={<TeacherDashboard />}
							/>
							<Route
								exact
								path="/adminDashboard/assignCourses"
								element={<AssignCourses />}
							/>
						</>
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
