const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
app.set('view engine', 'ejs');
const {check,current}=require('./validate')
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const cookieparser=require('cookie-parser')
app.use(cookieparser())
const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 20000
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

connectDb();

const User = require('./models/user');
const FoodDonation = require('./models/food');
const ClothDonation = require('./models/clothes');
const  BookDonation=require('./models/books')
app.use(current)
app.get('/', (req, res) => res.render('index',{user:res.locals.user}));
app.get('/sign-in', (req, res) => res.render('sign-in', { signerror: null }));
app.get('/login', (req, res) => res.render('index1', { loginerror: null }));
app.get('/contact', (req, res) => res.render('contact-us'));
app.get('/fund',check, (req, res) => res.render('fund'));
app.get("/books-donation",check, (req, res) => res.render('Books-Donation'));
app.get('/food-donation',check, (req, res) => res.render('Food-Donation'));
app.get('/clothes-donation',check, (req, res) => res.render('Clothes-Donation'));
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.render("index1", { loginerror: "User not found" });
    }
    if (password !== user.password) {
        return res.render('index1', { loginerror: "User details are wrong" });
    }
    const token = jwt.sign({ id: user }, "vamsi", { expiresIn: '1h' });
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }); 
    return res.redirect('/');
});

app.post("/sign-in", async (req, res) => {
    const { name, last, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("index1", { signerror: "User already exists" });
    }
    const newUser = await User.create({ name, last, email, password });
    const token = jwt.sign({ id: newUser }, "vamsi", { expiresIn: '1h' });
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
    return res.redirect('/');
});
app.get('/logout',(req,res)=>{
    res.cookie('jwt',"",{maxAge:1,httpOnly:true})
    res.redirect('/')
})
app.post('/food-donation', async (req, res) => {
    const { name, email, mobile, foodType, quantity } = req.body;
    try {
        await FoodDonation.create({ name, email, mobile, foodType, quantity });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error processing donation");
    }
});

app.post('/clothes-donation', async (req, res) => {
    const { name, email, mobile, clothingType, numberOfClothes, address } = req.body;
    try {
        await ClothDonation.create({ name, email, mobile, clothingType, numberOfClothes, address });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error processing donation");
    }
});

app.post('/books-donation', async (req, res) => {
    const { name, email, mobile, bookType, numberOfBooks, address } = req.body;
    try {
        await BookDonation.create({ name, email, mobile, bookType, numberOfBooks, address });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error processing donation");
    }
});
const port=process.env.PORT || 5000
app.listen(port, () => {
    console.log("app started");
});