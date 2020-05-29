import React from "react";
import { Navbar } from "../navbar/Navbar";
import StudentList from "../studentList/StudentList";
import Footer from "../footer/Footer";

const Landing = () => (
	<>
		<Navbar />
		<StudentList />
		<Footer />
	</>
);

export default Landing;
