const Course = require("../../models/courses");
const mongoose = require("mongoose");

const courseData = async (req, res) => {
    try {
        const { cid: id } = req.body;
        console.log(req.body);

        const courseDetails = await Course.findOne({
            _id: new mongoose.Types.ObjectId(id),
        });

        if (!courseDetails) {
            res.status(404).json("Course Not Found");
        } else {
            res.status(200).json(courseDetails);
        }
        console.log(courseDetails);
    } catch (e) {
        console.log(e);
        res.status(400).json({});
    }
};

const courseAdd = async (req, res) => {
    try {
        const { cname, cbranch, cdur, clec, clevel, cdes } = req.body;

        const addACourse = new Course({
            cname,
            cbranch,
            cdur,
            clec,
            clevel,
            cdes,
        });

        await addACourse.save();

        res.status(200).json({});
    } catch (e) {
        console.log(e);
        res.status(400).json({});
    }
};

const courseUpdate = async (req, res) => {
    try {
        const { cid: id } = req.body;
        const { data } = req.body;

        console.log(id, data);

        const updatedCourse = await Course.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                $set: {
                    cname: data.cname,
                    cbranch: data.cbranch,
                    cdur: data.cdur,
                    clec: data.clec,
                    clevel: data.clevel,
                    cdes: data.cdes,
                },
            }
        );

        console.log(updatedCourse);

        if (updatedCourse.modifiedCount === 0) {
            res.status(400).json("Unable to update course");
        }

        res.status(200).json({});
    } catch (e) {
        console.log(e);
        res.status(400).json({});
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("cno");
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    courseData,
    courseAdd,
    courseUpdate,
    getAllCourses
};
