import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
const authRoute = express.Router();

authRoute.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const isExisted = await User.exists({$or:[{username: username}, {email: email}]});
        if (isExisted) {return res.send({success: false, message: 'Email or username already exists'});}
        const hashedPassword = await bcrypt.hash(password,10);
        const user = {
            username: username,
            email: email,
            password: hashedPassword
        }
        await User.create(user);
        return res.send({success: true, message: 'Registered successfully!', data:user});
    }
    catch (err) {
        console.log(err);
        return res.send({success: false, message: "Internal server error"});
    }
})
authRoute.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if (!user) {return res.send({success: false, message: "Incorrect username or password"})}
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return res.send({success: true, message: "Log in successfully",data: user})
        } else {
            return res.send({success: false, message: "Incorrect username or password"})
        }
    }
    catch (err) {
        console.log(err);
        return res.send({success: false, message: "Internal server error"});
    }
})
authRoute.post('/keep-login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if (!user) {return res.send({success: false})}
        if (password === user.password) {return res.send({success: true})}
        return res.send({success: false})
    }
    catch (err) {
        console.log(err);
        return res.send({success: false, message: "Internal server error"});
    }
})
export default authRoute;