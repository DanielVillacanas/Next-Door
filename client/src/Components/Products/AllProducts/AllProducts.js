import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import ProductCard from "./ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import TypeSellerFilter from "../Filters/TypeSellerFilter";
import { calcDistance } from "../../../util/calcDistance";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

let service = new ProductService();

export default function AllProducts(props) {
  let [products, setProducts] = useState([]);
  let [productsCopy, setProductsCopy] = useState([]);
  let [productsToShow, setProductsToShow] = useState([]);
  let [filters, setFilters] = useState([]);
  let [shorts, setShort] = useState();
  let [range, setRange] = useState(0);
  let [search, setSearch] = useState("");
  let [page, setPage] = useState(1);
  let [length, setLength] = useState(0);

  let limit = 12;
  let numPages = Math.ceil(length / limit);

  let loadProducts = () => {
    service
      .getAllProducts()
      .then((result) => {
        setProducts((products = result.data.products));
        setProductsCopy((productsCopy = result.data.products));
        ourProductsToShow(result.data.products);
        setLength(result.data.length);
      })
      .catch((err) => console.log(err));
  };

  if (props.refresh === true) {
    loadProducts();
    props.changeValueRefresh();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page]);
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
      copy = products.filter((product) => product.name.toLowerCase().includes(search));
    }
    if (filters.length !== 0) {
      copy = copy.filter((product) => filters.includes(product.owner.type));
    }

    if (range > 0) {
      copy = copy.filter(
        (product) => range > calcDistance(product.owner?.coordinates, props.loggedUser?.coordinates)
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
    ourProductsToShow(copy);
  }, [search, filters, shorts, range, page]);

  let handleOnclickPage = (e) => {
    setPage(parseInt(e.currentTarget.name));
    window.scrollTo(0, 0);
  };

  let handlePrevNextPage = (e) => {
    if ((e.currentTarget.name = "Next" && page < numPages)) {
      setPage(page + 1);
    } else if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  let ourProductsToShow = (copy) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let tempArr = copy.slice(startIndex, endIndex);
    setProductsCopy(tempArr);
  };

  return (
    <>
      <div>
        <SearchBar getInfo={getInfo} />
        <TypeSellerFilter getFilter={getFilter} getShort={getShort} getRange={getRange} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsCopy.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-10">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                name="Prev"
                onClick={handlePrevNextPage}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                name="Next"
                onClick={handlePrevNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white">
                  <span className="font-medium"> {page < 2 ? 1 : limit + 1 * (page - 1)}</span>-
                  <span className="font-medium"> {page < 2 ? productsCopy.length : length}</span>
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    name="Prev"
                    onClick={handlePrevNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-100"
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                  {[...Array(numPages)].map((e, i) => {
                    return (
                      <button
                        onClick={handleOnclickPage}
                        name={i + 1}
                        aria-current="page"
                        className="z-10 bg-green-200 border-green-500 text-black relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:bg-green-300"
                      >
                        {i + 1}
                      </button>
                    );
                  })}

                  <button
                    name="Next"
                    onClick={handlePrevNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-green-300 bg-white text-sm font-medium text-black hover:bg-gray-100"
                  >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
