const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const path = require('path')
const multer = require('multer')
const upload = multer(); // sets up multer for parsing multipart/form-data
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');

const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();


router.get("/addSeenProducts/number/:number", authenticateToken, async (req, res) => {
    const number = req.params.number;

    try {
        const user = await User.findById(req.user.user._id);
        const last_seen_product = user.last_seen_product

        await User.findByIdAndUpdate(req.user.user._id, { last_seen_product: last_seen_product + number });

        res.json({last_seen_product: user.last_seen_product});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getInRange/startIndex/:startIndex/endIndex/:endIndex", authenticateToken, async (req, res) => {
    const startIndex = req.params.startIndex;
    const endIndex = req.params.endIndex;

    try {
        const user = await User.findById(req.user.user._id);
        const last_seen_product = user.last_seen_product;
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: "no_products_left" });
        }

        let currentLastSeen = user.last_seen_product ; // Assuming last_seen_product is stored as an integer

        // Calculate the new value
        const newLastSeen = currentLastSeen + products.length;

        // Update the user document with the new value
        await User.findByIdAndUpdate(req.user.user._id, { last_seen_product: newLastSeen });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // if there's no token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if the token is invalid
        req.user = user;
        next();
    });
}


const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'dauuluzrr',
    api_key: '443534535699831',
    api_secret: 'ntMs3tymIbU07pw13I4uLY7fWWM',
    secure: true,
});

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('productImage');

const dUri = req =>
    parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

//Creating product
router.post("/", multerUploads, async (req, res) => {

    // Find the latest team in the database
    if(req.file) {
        try{
        const file = dUri(req).content;

        const result = await cloudinary.uploader.upload(file);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image_url: result.secure_url,
            swapped: false,
            user_id: req.body.user_id,
        })

            const newProduct = await product.save()
            await User.findByIdAndUpdate(
                req.body.user_id,
                { $push: { products_user: newProduct } },
                { new: true }
            );
            res.status(201).json(newProduct)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

})
function errHandler(err, req, res, next){
    if(err instanceof multer.MulterError){
        res.json({
            success:0,
            message: err.message
        })
    }
}
router.use(errHandler)


router.get('/details/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router