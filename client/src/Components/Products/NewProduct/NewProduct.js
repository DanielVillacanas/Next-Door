import React, { useState } from "react";
import SellerService from "../../../Services/SellerServices/seller.service";

let sellerService = new SellerService();

export default function NewProduct(props) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    img_url: "",
    owner: props.storeUser._id,
  });

  let handleSubmit = (e) => {
    e.preventDefault();

    sellerService
      .createProduct(
        product.name,
        product.price,
        product.description,
        product.img_url,
        product.owner
      )
      .then((response) => {
        props.refreshProducts();
        props.close();
        props.history.push("/products");
      })
      .catch((err) => console.log(err));
  };

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <p className="text-center font-semibold text-lg text-green-800">
        Crear un nuevo producto
      </p>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <div className="mt-1">
              <input
                id="name"
                onChange={handleInputChange}
                name="name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <div className="mt-1">
              <input
                id="price"
                onChange={handleInputChange}
                name="price"
                type="number"
                step="any"
                min="0"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descipción
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                onChange={handleInputChange}
                name="description"
                type="text"
                required
                className="appearance-none h-28 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen del producto
            </label>
            <div className="mt-1">
              <input
                id="image"
                onChange={handleInputChange}
                name="img_url"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Añadir producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
