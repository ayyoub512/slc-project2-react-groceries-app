import axios from "axios";
import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer() {
	const [products, setProducts] = useState([]);

	// Will hold the quantity of each product
	const [productQuantity, setProductQuantity] = useState([]);

	useEffect(() => {
		handleProductsDB();
	}, []);

	// This so once the products update we update productQuantity state
	useEffect(() => {
		setProductQuantity(products.map((product) => ({ id: product.id, quantity: 0 })));
		// setProductQuantity(
		// 	products.map((prod) => {
		// 		return {
		// 			id: prod.id,
		// 			qty: 0,
		// 			price: parseFloat(prod.price.replace("$", ""))
		// 		};
		// 	})
		// );
	}, [products]);

	const handleProductsDB = async () => {
		try {
			const response = await axios.get("http://localhost:3000/products");
			setProducts(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	const [cartList, setCartList] = useState([]);

	const handleAddQuantity = (productId, mode) => {
		if (mode === "cart") {
			const newCartList = cartList.map((product) => {
				if (product.id === productId) {
					return { ...product, quantity: product.quantity + 1 };
				}
				return product;
			});
			setCartList(newCartList);
			return;
		} else if (mode === "product") {
			const newProductQuantity = productQuantity.map((product) => {
				if (product.id === productId) {
					return { ...product, quantity: product.quantity + 1 };
				}
				return product;
			});
			setProductQuantity(newProductQuantity);
			return;
		}
	};

	const handleRemoveQuantity = (productId, mode) => {
		if (mode === "cart") {
			const newCartList = cartList.map((product) => {
				if (product.id === productId && product.quantity > 1) {
					return { ...product, quantity: product.quantity - 1 };
				}
				return product;
			});
			setCartList(newCartList);
			return;
		} else if (mode === "product") {
			const newProductQuantity = productQuantity.map((product) => {
				if (product.id === productId && product.quantity > 0) {
					return { ...product, quantity: product.quantity - 1 };
				}
				return product;
			});
			setProductQuantity(newProductQuantity);
			return;
		}
	};

	const handleAddToCart = (productId) => {
		const product = products.find((product) => product.id === productId);
		const pQuantity = productQuantity.find((product) => product.id === productId);
		const newCartList = [...cartList];
		const productInCart = newCartList.find((product) => product.id === productId);
		if (productInCart) {
			productInCart.quantity += pQuantity.quantity;
		} else if (pQuantity.quantity === 0) {
			alert(`Please select quantity for ${product.productName}`);
		} else {
			newCartList.push({ ...product, quantity: pQuantity.quantity });
		}
		setCartList(newCartList);
	};

	const handleRemoveFromCart = (productId) => {
		const newCartList = cartList.filter((product) => product.id !== productId);
		setCartList(newCartList);
	};

	const handleClearCart = () => {
		setCartList([]);
	};

	return (
		<div>
			<NavBar quantity={cartList.length} />
			<div className="GroceriesApp-Container">
				<ProductsContainer
					products={products}
					handleAddQuantity={handleAddQuantity}
					handleRemoveQuantity={handleRemoveQuantity}
					handleAddToCart={handleAddToCart}
					productQuantity={productQuantity}
				/>
				<CartContainer
					cartList={cartList}
					handleRemoveFromCart={handleRemoveFromCart}
					handleAddQuantity={handleAddQuantity}
					handleRemoveQuantity={handleRemoveQuantity}
					handleClearCart={handleClearCart}
				/>
			</div>
		</div>
	);
}
