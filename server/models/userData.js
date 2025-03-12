const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmpassword: {
        type: String,
        required: true,
        unique: true
    },
    cart: [
        {
        productId: {type: String, required: true},
        image: {type: String, required: true},
            title: {type: String, required: true},
            price: {type: Number, required: true},
            category: {type: String, required: true},
            description: {type: String, required: true},
            quantity: {type:Number, default: 1},
            rating: {
                count: {type: Number},
                rate: {type: Number},
            }, 
        }
    
    ]
});

const userDataModel = mongoose.model('userData', userDataSchema);
module.exports = userDataModel;
