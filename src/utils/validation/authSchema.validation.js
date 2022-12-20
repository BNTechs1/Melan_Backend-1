const UserModel = require("../../models/user.model");
const authSchema = {
    userName: {
        notEmpty: true,
        errorMessage: "Username is required",
        isLength:({ min:3 })
    },
    password: {
        isStrongPassword: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    phoneNumber: {
        notEmpty: true,
        errorMessage: "Phone number is required"
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return UserModel.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    }
}

module.exports = {
    authSchema
}