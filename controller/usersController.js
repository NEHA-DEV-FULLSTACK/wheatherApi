const User = require('../models/userModel');
const UserToken = require('../models/UserToken');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const signpUser = async (req, res) => {
    try {
        const isUserExist = (await User.find({ username: req.body.username })).length;
        if (isUserExist) {
            return res.status(401).send('user already')
        }
        const user = new User(req.body);
        await user.save();
        return res.status(201).send("user saved")
    } catch (error) {
        return res.status(500).send('server error' + error)
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const isUserExist = (await User.find({ username, password })).length;
        if (isUserExist) {
            const token = jwt.sign({ username }, SECRET, { expiresIn: '15m' })
            res.status(200).json({
                token: token,
                message: "user logged in successfully"
            })
        } else {
            res.status(401).send('name or password is invalid')
        }
    } catch (error) {
        return res.status(500).send('server error')
    }
}

const logoutUser = async (req, res) => {
    try {
        //Bearer "yourtoken"
        const authHeader = req.headers['authorization'];
       // const gettoken = authHeader && authHeader.split(' ')[1];
        const token = authHeader && authHeader.split(' ')[1];
    console.log("token",token);
        const userToken = new UserToken({ token });
        await userToken.save();
        return res.status(200).send('logged out');
    } catch (error) {
        return res.status(500).send('server error')
    }
}

module.exports = { signpUser, login, logoutUser }