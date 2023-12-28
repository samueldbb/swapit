const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
require('dotenv').config();

// Define a route to retrieve user data
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); //.populate('name surname'); // Populate the 'name' and 'surname' fields with Team data
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'dauuluzrr',
    api_key: '443534535699831',
    api_secret: 'ntMs3tymIbU07pw13I4uLY7fWWM',
    secure: true,
});

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('profile_image');

const dUri = req =>
    parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

//Creating one team
router.post("/", multerUploads, async (req, res) => {

    if(req.file) {
        try{
            const file = dUri(req).content;

            const result = await cloudinary.uploader.upload(file);

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                surname: req.body.surname,
                date_of_birth: req.body.date_of_birth,
                description: req.body.description,
                localization: req.body.localization,
                profile_image_url: result.secure_url,
                last_seen_product: 0,
                swapped: false,
            })

            const newUser = await user.save()
            res.status(201).json(newUser)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

})

router.post('/login', async (req, res) => {
    try {

        const key = process.env.JWT_SECRET;

        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(
                { user },
                key,
                { expiresIn: '24h' }
            );
            res.json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }

});

router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Eliminar el usuario
        await User.findByIdAndRemove(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get("/addLikedProduct", authenticateToken, async (req, res) => {
    const product_liked_id = req.body.product_liked_id;
    const userId = req.user.user._id;

    try {
        // Add the product_liked_id to the user's products_liked_user array
        await User.findByIdAndUpdate(userId, {
            $addToSet: { products_liked_user: product_liked_id }
        });

        res.json({ message: "Product liked successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/addProductToSwap", authenticateToken, async (req, res) => {
    const product_to_swap_id = req.body.product_to_swap;
    const userId = req.user.user._id;

    try {
        // Add the product_liked_id to the user's products_liked_user array
        await User.findByIdAndUpdate(userId, {
            product_to_swap: product_to_swap_id
        });

        res.json({ message: "Product to swap added successfully" });
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

router.post('/validateToken', (req, res) => {
    const token = req.body.token;
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Token is invalid.' });
        }
        res.json({ valid: true, message: 'Token is valid.', userId: decoded.user._id });
    });
});

router.get('/details', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const secretKey = process.env.JWT_SECRET;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            date_of_birth: user.date_of_birth,
            description: user.description,
            localization: user.localization,
            profile_image_url: user.profile_image_url,
            last_seen_product: user.last_seen_product,
            swapped: user.swapped,
            products_user: user.products_user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router
