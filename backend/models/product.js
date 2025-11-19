// Initialize mongoose
const mongoose = require("mongoose");
// Define the schema for the product model
const Schema = mongoose.Schema;

/**
 * Our data looks like this
    "id": "3017620422003",
    "productName": "Nutella",
    "brand": "Ferrero",
    "image": "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.550.400.jpg",
    "price": "$3.65"
 */
const productSchema = new Schema({
	id: {
		type: String
		// unique: true
		// required: true, // I making this not required, because I am not sure
		// How the instruction want the implementation of that to be like
		// Especially when adding new product. I am thinking of generating a UUID,
		// but I beleive mongo does that with _id, so its pointless.

		//I beleive I need to make this unique, as per mongodb docs
		// https://mongoosejs.com/docs/schematypes.html#indexes
		// Actually, I had to comment unique:true, because inserting multiple products
		// without id is not allowed, cant have more than one null id products or else its not unique lol
	},
	productName: {
		type: String,
		required: true
	},

	brand: {
		type: String,
		required: true
	},

	image: {
		type: String,
		required: true
	},

	price: {
		type: String,
		required: true
	}
});

// Creating the model for the product schema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
