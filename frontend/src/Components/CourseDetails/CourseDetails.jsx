import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../../bearer";
import toast from "react-hot-toast";

const CourseDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({ cdur: 0 });

    const fetchData = async () => {
        try {
            const response = await publicApi.post("api/course/details", { cid: id });
            setData(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch course details.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const sendRegisterRequest = async () => {
        try {
            const response = await publicApi.post("api/student/addCourseRequest", {
                data: { cid: id },
                token: sessionStorage.getItem("token"),
            });
            if (response.status === 200) {
                toast.success("Successfully requested to join the course.");
            } else {
                toast.error("Failed to join the course.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to join the course.");
        }
    };

    return (
        <div className="container mx-auto mt-16">
            <div className="text-4xl font-semibold mb-6">Course Details</div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col space-y-4">
                    <div className="text-xl font-semibold">Course Name: {data.cname}</div>
                    <div>Total Lectures: {data.clec}</div>
                    <div>Total Hours: {data.cdur.hours}</div>
                    <div>Course Level: {data.clevel}</div>
                    <div>Created On: {new Date(data.CrD).toLocaleDateString()}</div>
                    <div>Course Description: {data.cdes}</div>
                    <div className="flex justify-center">
					<button
                        className="bg-blue-600 text-white py-2 px-2 rounded-lg mt-8 w-36"
                        onClick={sendRegisterRequest}
                    >
                        Join Now
                    </button>
					</div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
