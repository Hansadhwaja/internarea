const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();


let otpStorage = {};

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendOtpEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: 'hansadhwajabiswal@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

router.post('/send-otp', (req, res) => {
    const email = req.body.email;
    const otp = generateOtp();
    otpStorage[email] = {
        otp: otp,
        expiry: Date.now() + 5 * 60 * 1000, 
    };

    sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent successfully' });
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStorage[email]) {
        const { otp: storedOtp, expiry } = otpStorage[email];
        if (Date.now() > expiry) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        if (otp === storedOtp) {
            delete otpStorage[email];
            return res.json({ message: 'OTP verified successfully' });
        }
    }
    res.status(400).json({ message: 'Invalid OTP' });
});

module.exports= router