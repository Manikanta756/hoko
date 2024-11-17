// models/BookDonation.js

const mongoose = require('mongoose');
const bookDonationSchema = new mongoose.Schema({
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
    bookType: {
        type: String,
        required: true,
    },
    numberOfBooks: {
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
        default: Date.now
    }
});
const BookDonation = mongoose.model('BookDonation', bookDonationSchema);
module.exports = BookDonation;