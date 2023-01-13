const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
    firstname : {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastname : {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email : {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    telephone : {
        type: Number,
        required: [true, "Telephone is required"],
    },
    address1 : {
        type: String,
        required: [true, "Address1 is required"],
    },
    address2 : {
        type: String,
        default: false,
    },
    country : {
        type: String,
        required: [true, "Country is required"],
    },
    city : {
        type: String,
        required: [true, "City is required"],
    },
    postcode : {
        type: Number,
        required: [true, "Postcode is required"],
    },
    state : {
        type: String,
        required: [true, "State is required"],
    },
    password : {
        type: String,
        required: [true, "Password is required"],
        min: [6, "Must be greater than or equal to 6"],
    },
    emailverification : {
        type: Boolean,
        default: false,
    },
    terms : {
        type: String,
        required: [true, "Terms is required"],
    },
    newsletter : {
        type: String,
        default: false,
    },
    token: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;