// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
require("dotenv").config();
const { DB_URI } = process.env;

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Enable CORS for all requests to the server (Cross-Origin Resource Sharing) - This is needed to allow the frontend to make requests to the backend server

// Connect to the database
mongoose
	.connect(DB_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.log("Error connecting to the database", error.message);
	});

/**
 * Routes
 *  */

// GET index
server.get("/", (request, response) => {
	response.send("Live");
});

// GET all products from mongodb
server.get("/products", async (request, response) => {
	try {
		const product = await Product.find();
		response.send(product);
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
});

// POST - Used to add product to database and communicate back on operation status
server.post("/add-product", async (request, response) => {
	const { name, brand, price, image } = request.body;
	const newProduct = new Product({
		productName: name,
		brand,
		price: parseFloat(price),
		image
	});
	try {
		await newProduct.save();
		response.status(201).json({ message: "Product added successfully" });
	} catch (error) {
		console.log(error);
		response.status(400).json({ message: error.message });
	}
});

// DELETE - Used to delete a product idenitified by the :id
// Also communicates back whether the operation is a success
server.delete("/products/:id", async (request, response) => {
	const { id } = request.params;
	const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
	try {
		await Product.findByIdAndDelete(objectId);
		response.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
});

// PATCH - Used to update a product
server.patch("/products/:id", async (request, response) => {
	const { id } = request.params;
	const { name, brand, price, image } = request.body;
	const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
	try {
		await Product.findByIdAndUpdate(id, {
			productName: name,
			brand,
			price,
			image
		}).then((response) => {
			console.log(response);
		});

		await response.status(200).json({ message: "Product updated successfully" });
	} catch (error) {
		response.status(404).json({ message: error.message });
	}
});
