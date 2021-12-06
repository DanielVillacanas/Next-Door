import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";

export default function AllProducts() {
  let [products, setProducts] = useState([]);
  let [productsCopy, setProductsCopy] = useState([]);

  const [search, setSearch] = useState("");
  let service = new ProductService();

  let loadProducts = () => {
    service
      .getAllProducts()
      .then((result) => {
        setProducts((products = result.data));
        setProductsCopy((productsCopy = result.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getInfo = (search2) => {
    setSearch(search2);
  };

  useEffect(() => {
    let copy = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    setProductsCopy(copy);
  }, [search]);

  return (
    <div className="bg-white">
      <SearchBar getInfo={getInfo} />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productsCopy.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
