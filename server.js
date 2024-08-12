const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Product = require('./productModel');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://eirmonsolutions06:eejn8UiF6g0Ig9ek@cluster0.twv6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    socketTimeoutMS: 60000 // Increase socket timeout to 60 seconds
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Could not connect to MongoDB", err);
});

// Routes

// Create a new product
app.post('/products', async (req, res) => {
    const { department, name, size } = req.body;
    try {
        const newProduct = new Product({ department, name, size });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Read all products
app.get('/api/liquor', async (req, res) => {
    try {
        const liquor = await Product.find({ department: "Liquor" });
        res.status(200).send(liquor);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/api/beer', async (req, res) => {
    try {
        const beer = await Product.find({ department: "Beer" });
        res.status(200).send(beer);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/api/wine', async (req, res) => {
    try {
        const wine = await Product.find({ department: "Wine" });
        res.status(200).send(wine);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { department, name, size } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { department, name, size },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).send({ error: "Product not found" });
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send({ error: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
