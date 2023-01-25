const Ajv = require('ajv');
const ajv = new Ajv();
// const PermissionsModel = require('../models/permissionsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user')

require('dotenv').config();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

function passwordsMatch(req, res, next) {
    if (req.body.password !== req.body.repassword) {
        res.status(400).send("Passwords dont match");
        return;
    }
    delete req.body.repassword;
    // const {repasword, ...rest} = req.body
    // req.body = rest
    next();
}

async function hashPwd(req, res, next) {
    const saltRounds = 10;
    console.log('saltRounds', saltRounds, 'req.body.password', req.body.password);
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        // console.log(hash);
        next();
    });
}

const isValidId = async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findOne({ userId })
    // console.log(user);
    if (!user) {
        res.status(400).send('There is no existing user selected');
        return;
    }
    next();
}

const isNewUser = async (req, res, next) => {
    const { userId } = req.params;
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        res.status(400).send('User already exists');
        return;
    }
    next();
};

const checkIfUserExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).send('User with this email does not exist');
            return;
        }
        req.body.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
}

const passwordCompare = async (req, res, next) => {

    const user = req.body.user
    const password = req.body.password

    console.log('user', user, 'password', password);
    try {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(404).send("passwords dosent match!")
        }
        next()
    } catch (err) {
        return res.status(404).send("passwords dosent match!")
    }
}

const genrateToken = async (req, res, next) => {
    const user = req.body.user
    const token = user.generateAuthToken()
    req.body.token = token;
    // res.cookie("token", token, { httpOnly: true })
    // res.send({ user, token })
    next()
}



module.exports = {
    passwordsMatch,
    hashPwd,
    checkIfUserExists,
    isValidId,
    isNewUser,
    passwordCompare,
    genrateToken
};