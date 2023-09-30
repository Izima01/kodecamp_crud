const bcrypt = require('bcrypt');
const express = require("express");
require('dotenv').config();
const route = express.Router();
const userCollection = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;
const { isUserLoggedIn } = require('./middlewares');

route.post('/register', async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await userCollection.create({
        fullName, email, password: hashedPassword, role
    });

    res.status(201).send('Created Successfully');
});

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDetail  = await userCollection.findOne({ email });
    const { email: userEmail, _id: userId, role } = userDetail;
    
    if (!userDetail) return res.status(404).send("User not found");

    const doesPasswordMatch = bcrypt.compareSync(password, userDetail.password);
    if (!doesPasswordMatch) return res.status(400).send("invalid-credentials");

    const token = jwt.sign({ userEmail, userId, role }, secret);

    res.status(200).json({ message: "Sign in successfully", token });
});

route.get('/profile', isUserLoggedIn, async (req, res) => {
    try {
        const user = await userCollection.findById(req.decoded.userId, "fullName email");
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

module.exports = route;