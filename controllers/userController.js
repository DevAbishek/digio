const userModel = require('../models/userModel');

const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await userModel.findOne({userId, password, verified:true});
        if (user) {
            res.status(201).send(user)
        }
        else {
            res.status(401).json({
                message: "Login Fail",
                user
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const registerController = async (req, res) => {
    try {
        const newUser = new userModel({...req.body, verified:true});
        await newUser.save();
        res.status(201).send('User Added Successfully')
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = { loginController, registerController }