import ProductCard from "./ProductCard";

export default function ProductsContainer({ products, handleAddQuantity, handleRemoveQuantity, handleAddToCart, productQuantity }) {
	// products.forEach((product) => {
	// 	console.log("Product: ", product);
	// });

	return (
		<div className="ProductsContainer">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					{...product}
					handleAddQuantity={handleAddQuantity}
					handleRemoveQuantity={handleRemoveQuantity}
					handleAddToCart={handleAddToCart}
					productQuantity={productQuantity.find((p) => p.id === product.id)}
				/>
			))}
		</div>
	);
}
