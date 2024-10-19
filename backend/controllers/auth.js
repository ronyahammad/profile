require("dotenv").config({ path: "../config.env" });
const User= require('../Models/User')
const { Certificate } = require("node:crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const _ = require("lodash");
const expressJwt = require('express-jwt');
//const nodemailer = require("nodemailer"); 
const sendEmail=require('../Utils/sendEmail')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password)
            return res.status(400).json({ msg: "Please fill in all fields." })

        if (password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters." })

        const user_email = await User.findOne({ email: email })
        if (user_email) {
            return res.status(400).json({ msg: "this email is already in use" })
        } else {
            const passwordHash = await bcrypt.hash(password, 12)

            const token = jwt.sign(
                {
                    name,
                    email,
                    password: passwordHash,
                },
                process.env.JWT_ACCOUNT_ACTIVATION,
                {
                    expiresIn: "30m",
                }
            );
            const from = "no-reply"
            const text = "Please activate your email!!"
            const html = `
    <h1>Please use the following to activate your account</h1>
    <p>${process.env.CLIENT1_URL}/users/activate/${token}</p>
    <hr />
    <p>This email may contain sensitive information</p>
    <p>${process.env.CLIENT1_URL}</p>
`
            const subject = "Account activation link"
            sendEmail(email, text, html, subject)
            res.json({ msg: "Register Success! Please activate your email to start." })
        }    
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
    
}

exports.activationController = async (req, res) => {
    try {
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token, process.env.JWT_ACCOUNT_ACTIVATION)
        const { name, email, password } = user
        const check = await User.findOne({ email })
        if (check) return res.status(400).json({ msg: "This email already exists." })
        const newUser = new User({ name, email, password })
        await newUser.save()
        res.json({
            msg: 'Account has been activated!'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if email and password is provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide an email and password" });
        }
        // Check that user exists by email
        const user = await User.findOne({ email })
        const useInfo={name:user.name, role:user.role}
        if (!user) return res.status(404).json({ msg: "this email does not exist" });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(404).json({ msg: "Password mismatch" })
        const access_token = createAccessToken({
            "UserInfo": {
                "name": user.name,
                "id": user._id,
                "role": user.role
            }
        })
        const refresh_token = createRefreshToken({ id: user._id })
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            path: '/api/auth/refreshtoken',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.json({
            msg: 'Login Success!',
            access_token, 
            useInfo,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/api/auth/refreshtoken' })
        return res.json({ msg: "Logged out." })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
},

     exports.getAccessToken = async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "refresh token not found, you are not logged in" })

            jwt.verify(rf_token, process.env.JWT_RESET_PASSWORD, (err, result) => {
                if (err) return res.status(400).json({ msg: "Token is invalid. Please login" })
                const access_token = createAccessToken({
                    "UserInfo": {
                        "name": result.name,
                        "id": result._id,
                        "role": result.role
                    }
                })
                
                res.status(200).json({ access_token })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    } 


exports.forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "This email does not exist." })
            //return next(new ErrorResponse("No email could not be sent", 404));
        }
        const resetToken = user.createAccessToken({ id: user._id });
        await user.save();
        const resetUrl = `${process.env.CLIENT1_URL}/passwordreset/${resetToken}`;

        // HTML Message
        const html = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `
        const subject = "Password Reset Request"
        sendEmail(process.env.EMAIL_FROM, email, subject, html)
        res.json({ msg: "Email with Activation link Sent" })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
exports.resetPassword = async (req, res) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.body.token)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            msg: "Password Updated Success",
            token: user.getSignedJwtToken(),
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


exports.loginGoogle = async (req, res) => {
    try {
        const accessToken = req.body.accessToken
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
            {

                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },)
        const verification = response.data.email_verified
        if (!verification) {
            req.json({ msg: "verification failed" })
        } else {
            const user = await User.findOne({ email: response.data.email })
            if (user) {
                //const newData= new User({_id:response.data.sub,name:response.data.name,email:response.data.email,avatar:response.data.picture})  
                const refresh_token = createRefreshToken({ id: user._id })
                res.cookie("refreshtoken", refresh_token, {
                    sameSite: 'none',
                    httpOnly: true,
                    secure: true, //https
                    path: '/api/auth/refreshtoken',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })
                res.json(user)
            } else {
                const newData = new User({ name: response.data.name, email: response.data.email, avatar: response.data.picture })
                newData.save()
                console.log(newData._id)
                const refresh_token = createRefreshToken({ id: newData._id })
                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    secure: true, //https
                    sameSite: 'None', //cross-site cookie
                    path: '/api/auth/refreshtoken',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })
                res.json(newData)
            }
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


exports.contactMe = async (req, res) => {
    try {
        const { name, email, subject, content } = req.body
        const from = "from the portfolio"
        const to = process.env.EMAIL_FROM
        const html = `
  <h1>${name}</h1>
  <p>${email}</p>
  <p>${content}</p>
  `
        sendEmail(from, to, subject, html)
        res.status(200).json({ msg: "Mssage sent.Thank you!!" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_RESET_PASSWORD, { expiresIn: process.env.JWT_EXPIRE })
}