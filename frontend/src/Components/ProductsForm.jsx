// import React from "react";

export default function ProductsForm({ isEditing, formData, handleOnChange, handleOnSubmit, register, handleSubmit, errors }) {
	return (
		<div className="">
			<form onSubmit={handleSubmit(handleOnSubmit)} className="product-form">
				<div>
					<input
						type="text"
						name="name"
						{
							// If isEditing is true, then don't register the input fields
							...(isEditing
								? {}
								: register("name", {
										required: "Product name is required"
										// Name can be anything no restrictions
										// pattern: {
										// 	value: /^[a-zA-Z\s]+$/,
										// 	message: "Name should contain only alphabets"
										// }
								  }))
						}
						value={formData.name}
						onChange={handleOnChange}
						placeholder="Name"
					/>
					{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
				</div>

				<div>
					<input
						type="text"
						name="brand"
						{...(isEditing
							? {}
							: register("brand", {
									required: "Brand is required"
							  }))}
						value={formData.brand}
						onChange={handleOnChange}
						placeholder="Brand"
					/>
					{errors.brand && <span style={{ color: "red" }}>{errors.brand.message}</span>}
				</div>

				<div>
					<input
						type="text"
						name="image"
						{...(isEditing
							? {}
							: register("image", {
									required: "Image URL is required",
									pattern: {
										value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
										message: "Invalid URL"
									}
							  }))}
						value={formData.image}
						onChange={handleOnChange}
						placeholder="Image URL"
					/>
					{errors.image && <span style={{ color: "red" }}>{errors.image.message}</span>}
				</div>

				<div>
					<input
						type="number"
						name="price"
						step="0.01"
						{...(isEditing
							? {}
							: register("price", {
									required: "Price is required"
									// pattern: {
									// 	value: /^[0-9]{10}$/,
									// 	message: "price should be 10 digits"
									// }
							  }))}
						value={formData.price}
						onChange={handleOnChange}
						placeholder="Price"
					/>
					{errors.price && <span style={{ color: "red" }}>{errors.price.message}</span>}
				</div>

				<button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
			</form>
		</div>
	);
}
