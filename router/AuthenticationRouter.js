const {User, validate} = require('../models/Users');
const express = require('express')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Set up Global configuration access
dotenv.config();


router.post("/users/login", async (req, res) => {
    email_or_username = req.body.username;
    password = req.body.password;

    if (!email_or_username || !password) {
        return res.status(400).send("please provide email/username and password");
    }

    // get account from database
    const account = await User.findOne({ $or: [{email: email_or_username},{ username: email_or_username}] });

    // check account found and verify password
    if (!account || !bcrypt.compareSync(password, account.password)) {
        // authentication failed
        return res.status(401).send("Authentication Failed, please check username/email or password");
    } else {
        // authentication successful
        // Validate User Here
        // Then generate JWT Token

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: account.username,
        }

        const token = jwt.sign(data, jwtSecretKey);

        return res.status(202).send(token);
    }

});


// Verification of JWT
router.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});


module.exports = router;