const Teacher = require('../../models/teacherDetails');
const User = require('../../models/userReg');
const mongoose = require('mongoose');

const teacherData = async (req, res) => {
    try {
        const { id } = req.body;

        const teacherDetails = await Teacher.findOne({
            tuser: new mongoose.Types.ObjectId(id),
        }).populate("tuser");

        if (!teacherDetails) {
            res.status(404).json("Teacher not found");
        } else {
            res.status(200).json(teacherDetails);
        }
        console.log(teacherDetails)
    } catch (e) {
        console.log(e);
        res.status(400).json({});
    }
};

const teacherAdd = async (req, res) => {
    try {
        const { id } = req.body;

        const teacherExists = await User.findById(id);

        if (!teacherExists) {
            res.send(404).json("Teacher Not Found");
            return;
        }

        const addTeacher = new Teacher({
            tuser: id,
        });

        await addTeacher.save();
        //console.log(addTeacher);
        res.status(201).json(addTeacher);
        //res.status(200).json({});

    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
};

const teacherUpdate = async (req, res) => {
    try {
        const { id } = req.body;
        const { data } = req.body;

        console.log(id, data);

        const updatedTeacher = await Teacher.updateOne({
            tuser: new mongoose.Types.ObjectId(id)
        }, {
            tcourses: {
                $push: {
                    cid: new mongoose.Types.ObjectId(data.cid),
                },
            },
        });
        console.log(updatedTeacher);

        if (updatedTeacher.modifiedCount === 0) {
            res.status(400).json("Unable to add course")
        };

        res.status(200).json({});

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

module.exports = { teacherData, teacherAdd, teacherUpdate };