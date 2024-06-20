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
        <div className="min-h-screen p-8 bg-custom-dark flex justify-center items-center">
            <div className="max-w-4xl w-1/3 bg-custom-light p-6 rounded-lg shadow-lg">
                {/* <h2 className="text-3xl font-bold mb-6 text-custom-red">Course Details</h2> */}
                <div className="flex flex-col gap-y-4 text-custom-red">
                    <div className="text-3xl font-bold mb-6 text-custom-red">{data.cname}</div>
                    <div>Total Lectures: {data.clec}</div>
                    <div>Total Hours: {data.cdur.hours}</div>
                    <div>Course Level: {data.clevel}</div>
                    <div>Created On: {new Date(data.CrD).toLocaleDateString()}</div>
                    <div>Course Description: {data.cdes}</div>
                    <div className="flex justify-center mt-6">
                        <button
                            className="text-custom-red border-1 border-custom-red py-1 px-4 rounded-full font-semibold hover:bg-custom-red hover:text-custom-light transition duration-200"
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
