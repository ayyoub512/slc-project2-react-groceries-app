import axios from "axios";
import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductsForm from "./ProductsForm";
import { useForm } from "react-hook-form";

export default function GroceriesAppContainer() {
	const [products, setProducts] = useState([]);

	// Will hold the quantity of each product
	const [productQuantity, setProductQuantity] = useState([]);

	// Loads products on page load once
	useEffect(() => {
		handleProductsDB();
	}, []);

	// This so once the products update we update productQuantity state
	useEffect(() => {
		setProductQuantity(products.map((product) => ({ id: product.id, quantity: 0 })));
	}, [products]);

	// Function to handle calling the backend and retreiving products
	const handleProductsDB = async () => {
		try {
			const response = await axios.get("http://localhost:3000/products");
			setProducts(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	// State for cart
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

	// This state is mainly used to communicate backend response to user
	const [postResponse, setPostResponse] = useState("");

	// This state is used for products we fetch from backend
	const [productData, setProductData] = useState([]);

	// Stores product form data
	const [formData, setFormData] = useState({
		name: "",
		brand: "",
		image: "",
		price: ""
	});

	// Stores whehther we're in editing mode or not
	const [isEditing, setIsEditing] = useState(false);

	// React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	// Handling form data
	const handleOnchange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handling form submission
	const handleOnSubmit = async (e) => {
		e.preventDefault;
		try {
			if (isEditing) {
				// If isEditing is true, then update the product
				try {
					await handleUpdate(formData._id); // Updating the product
					await setIsEditing(false); // Set isEditing to false
					await setFormData({
						name: "",
						brand: "",
						image: "",
						price: ""
					});
				} catch (error) {
					console.log(error.message);
				}
			} else {
				// If isEditing is false, then add the product
				await axios.post("http://localhost:3000/add-product", formData).then((response) => {
					setPostResponse(response.data.message);
				});
				setFormData({ name: "", brand: "", image: "", price: "" });
				handleProductsDB(); // refresh
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// Handling edit product
	const handleEdit = async (product) => {
		console.log("Editing:", product);
		setIsEditing(true);
		setFormData({
			name: product.productName,
			brand: product.brand,
			image: product.image,
			price: parseFloat(product.price.replace("$", "")).toFixed(2),
			_id: product._id
		});
	};

	// Handling update product in the database by id
	const handleUpdate = async (id) => {
		try {
			await axios.patch(`http://localhost:3000/products/${id}`, formData).then((response) => {
				setPostResponse(response.data.message);
			});
			handleProductsDB();
			// setPostResponse("Product updated successfully");
		} catch (error) {
			console.log(error.message);
		}
	};

	// Handling delete product from the database by id
	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/products/${id}`).then((response) => {
				setPostResponse(response.data.message);
			});
			handleProductsDB();
			// setPostResponse("Product deleted successfully");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<NavBar quantity={cartList.length} />

			<p style={{ color: "green" }}>{postResponse}</p>

			<div className="GroceriesApp-Container">
				<ProductsContainer
					products={products}
					handleAddQuantity={handleAddQuantity}
					handleRemoveQuantity={handleRemoveQuantity}
					handleAddToCart={handleAddToCart}
					productQuantity={productQuantity}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>

				<div className="form-cart-container">
					<div>
						<h2>Product Form</h2>
						<ProductsForm
							formData={formData}
							handleOnChange={handleOnchange}
							handleOnSubmit={handleOnSubmit}
							isEditing={isEditing}
							register={register}
							handleSubmit={handleSubmit}
							errors={errors}
						/>
					</div>
					<CartContainer
						cartList={cartList}
						handleRemoveFromCart={handleRemoveFromCart}
						handleAddQuantity={handleAddQuantity}
						handleRemoveQuantity={handleRemoveQuantity}
						handleClearCart={handleClearCart}
					/>
				</div>
			</div>
		</div>
	);
}
