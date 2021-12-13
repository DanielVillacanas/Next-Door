import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import TypeSellerFilter from "../Filters/TypeSellerFilter";
import { calcDistance } from "../../../util/calcDistance";

let service = new ProductService();

export default function AllProducts(props) {
  let [products, setProducts] = useState([]);
  let [productsCopy, setProductsCopy] = useState([]);
  let [filters, setFilters] = useState([]);
  let [shorts, setShort] = useState();
  let [range, setRange] = useState(0);
  let [search, setSearch] = useState("");

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

  useEffect(() => {
    loadProducts();
  }, []);

  const getInfo = (searching) => {
    setSearch(searching);
  };
  const getShort = (id) => {
    setShort(id);
  };
  const getRange = (range) => {
    setRange(range);
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

    if (range > 0) {
      copy = copy.filter(
        (product) =>
          range >
          calcDistance(
            product.owner.coordinates,
            props.loggedUser.loggedUser.coordinates
          )
      );
    }
    if (shorts == 1) {
      copy = copy.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    } else if (shorts == 0) {
      copy = copy.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }
    setProductsCopy(copy);
  }, [search, filters, shorts, range]);

  return (
    <>
      <div className="bg-white">
        <SearchBar getInfo={getInfo} />
        <TypeSellerFilter
          getFilter={getFilter}
          getShort={getShort}
          getRange={getRange}
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {productsCopy.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#4ade80"
          fill-opacity="1"
          d="M0,288L80,272C160,256,320,224,480,218.7C640,213,800,235,960,234.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
