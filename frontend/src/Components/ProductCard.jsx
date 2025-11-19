import QuantityCounter from "./QuantityCounter";

export default function ProductCard({ productName, product, brand, image, price, productQuantity, handleAddQuantity, handleRemoveQuantity, handleAddToCart, id, handleDelete, handleEdit }) {
	return (
		<div className="ProductCard">
			<h3>{productName}</h3>
			<img src={image} alt="" />
			<h4>{brand}</h4>

			<QuantityCounter handleAddQuantity={handleAddQuantity} productQuantity={productQuantity?.quantity} handleRemoveQuantity={handleRemoveQuantity} id={id} mode="product" />
			<h3>{price}</h3>
			<button onClick={() => handleAddToCart(id)}>Add to Cart</button>

			<br />
			<button onClick={() => handleDelete(product._id)}>Delete</button>
			<button onClick={() => handleEdit(product)}>Edit</button>
		</div>
	);
}
