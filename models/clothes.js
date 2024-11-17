
const mongoose = require('mongoose');
const clothDonationSchema = new mongoose.Schema({
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
    clothingType: {
        type: String,
        required: true,
    },
    numberOfClothes: {
        type: Number,
        required: true,
        min: 1 
    },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const ClothDonation = mongoose.model('ClothDonation', clothDonationSchema);
module.exports = ClothDonation;