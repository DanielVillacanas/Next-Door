import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import TypeSellerFilter from "../Filters/TypeSellerFilter";

export default function AllProducts(props) {
  let [products, setProducts] = useState([]);
  let [productsCopy, setProductsCopy] = useState([]);
  let [filters, setFilters] = useState([]);
  let [shorts, setShort] = useState();
  let [search, setSearch] = useState("");

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

  if (props.refresh === true) {
    loadProducts();
  }
  props.changeValueRefresh();

  useEffect(() => {
    loadProducts();
  }, []);

  const getInfo = (search2) => {
    setSearch(search2);
  };

  const getFilter = (filter) => {
    let allFilters = [...filters];
    if (allFilters.includes(filter)) {
      let indice = allFilters.indexOf(filter);
      allFilters.splice(indice, 1);
    } else {
      allFilters.push(filter);
    }
    setFilters(allFilters);
  };

  const getShort = (id) => {
    setShort(id);
  };

  useEffect(() => {
    let copy = [...products];
    if (search.length !== 0) {
      copy = products.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }
    if (filters.length !== 0) {
      copy = copy.filter((product) => filters.includes(product.owner.type));
    }
    if (shorts == 1) {
      console.log("mas caro");
      copy = copy.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
      console.log(copy);
    } else if (shorts == 0) {
      console.log("mas barato");
      copy = copy.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
      console.log(copy);
    }
    setProductsCopy(copy);
  }, [search, filters, shorts]);

  return (
    <div className="bg-white">
      <SearchBar getInfo={getInfo} />
      <TypeSellerFilter getFilter={getFilter} getShort={getShort} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
