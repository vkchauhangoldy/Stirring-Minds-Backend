const express = require("express");
const bcrypt = require('bcrypt')
const userModel = require('../model/user.js')
const jwt = require("jsonwebtoken")
const router = express.Router();
const cors = require('cors')

router.use(cors())
const salt = 10;
const SECRET_KEY = "vkchauhangoldystirringminds"

// get all users
router.get('/all', async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({
            status: "success",
            allUsers
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
})
//signup api
router.post('/signup', async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;

        if (!email || !password || !cpassword) {
            res.status(400).json({
                status: "failed",
                message: "Please enter all fields..!"
            })
        } else if (await userModel.findOne({ email })) {
            res.status(400).json({
                status: "failed",
                message: "User is already registered..!"
            })
        } else if (password !== cpassword) {
            res.status(400).json({
                status: "failed",
                message: "Password doesn't match..!"
            })
        } else {
            bcrypt.hash(password, salt, async function (err, hashed) {
                if (err) {
                    res.status(400).json({
                        status: 'failed',
                        message: err.message
                    })
                } else {
                    const newUser = await userModel.create({ email, password: hashed })
                    res.status(200).json({
                        status: "succes",
                        message: "User registered successfully..!",
                        newUser
                    })
                }
            })
        }
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

// sign in api

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are mandatory...!"
            })
        }
        const data = await userModel.findOne({ email })
        if (!data) {
            return res.status(400).json({
                status: "failed",
                message: "user is not registered...!"
            })
        }
        bcrypt.compare(password, data.password, function (err, result) {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: err.message
                })
            }
            if (result) {
                const token = jwt.sign({ id: data._id }, SECRET_KEY)
                return res.status(200).json({
                    status: "success",
                    message: "User loged in successfully....!",
                    token
                })
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: "not a valid password"
                })
            }
        })


    } catch (err) {
        return res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
})


module.exports = router;