const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        const { _id } = newUser;

        const token = jwt.sign({ _id }, 'supersecret', {
            expiresIn: '90d'
        });

        res.status(200).json({
            status: 'success',
            token,
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.stack
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please enter email and password', 401));
        }

        const user = await User.findOne({ email }).select('+password');

        console.log(user);

        if (!user || !user.isCorrectPassword(user.password, password)) {
            return next(new AppError(`Email or password is incorrect`, 401));
        }

        const token = req.headers.authorization.split(' ')[1];

        res.status(201).json({
            status: 'success',
            token
        });
    } catch (error) {
        res.status(400).json({
            error: error.stack
        });
    }
};
