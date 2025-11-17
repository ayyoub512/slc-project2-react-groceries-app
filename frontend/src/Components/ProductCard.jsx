import QuantityCounter from "./QuantityCounter";

export default function ProductCard({ productName, brand, image, price, productQuantity, handleAddQuantity, handleRemoveQuantity, handleAddToCart, id }) {
	return (
		<div className="ProductCard">
			<h3>{productName}</h3>
			<img src={image} alt="" />
			<h4>{brand}</h4>

			<QuantityCounter handleAddQuantity={handleAddQuantity} productQuantity={productQuantity?.quantity} handleRemoveQuantity={handleRemoveQuantity} id={id} mode="product" />
			<h3>{price}</h3>
			<button onClick={() => handleAddToCart(id)}>Add to Cart</button>
		</div>
	);
}
