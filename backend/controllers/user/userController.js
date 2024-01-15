const User = require('../../models/userReg');
const mongoose = require("mongoose")

const editProfile = async (req, res) => {
    try {
        // Extract the user ID from the authenticated user
        const userId = req.user.id;
        console.log(userId);

        // Extract updated user data from the request body
        const userData = req.body;
        console.log(userData);

        // Update the user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userData, // Pass userData directly to update fields
            { new: true, useFindAndModify: false }
        );

        console.log(updatedUser)

        if (!updatedUser) {
            throw new Error("No User Found!");
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.error('Validation Error:', err.errors);
            res.status(400).json({ error: 'Validation Error', details: err.errors });
        } else {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
    
};

module.exports = { editProfile };
