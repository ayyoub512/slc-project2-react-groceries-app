import ProductCard from "./ProductCard";

export default function ProductsContainer({ products, handleAddQuantity, handleRemoveQuantity, handleAddToCart, productQuantity, handleDelete, handleEdit }) {
	// products.forEach((product) => {
	// 	console.log("Product: ", product);
	// });

	return (
		<div className="ProductsContainer">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					{...product}
					product={product}
					handleAddQuantity={handleAddQuantity}
					handleRemoveQuantity={handleRemoveQuantity}
					handleAddToCart={handleAddToCart}
					productQuantity={productQuantity.find((p) => p.id === product.id)}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			))}
		</div>
	);
}
