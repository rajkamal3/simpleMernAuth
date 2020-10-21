const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name.']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please enter the password.']
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.isCorrectPassword = async function (storedPassowrd, enteredPassword) {
    return await bcrypt.compare(storedPassowrd, enteredPassword);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const user = mongoose.model('User', userSchema);

module.exports = user;
