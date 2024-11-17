// models/FoodDonation.js

const mongoose = require('mongoose');

// Define the Food Donation Schema
const foodDonationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);
module.exports = FoodDonation;