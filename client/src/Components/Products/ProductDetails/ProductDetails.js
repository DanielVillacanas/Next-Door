import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsDetails(props) {
  const reviews = { href: "#", average: 2, totalCount: 117 };

  let [count, setCount] = useState(0);
  let [product, setProduct] = useState();
  let [owner, setOwner] = useState();

  const { id } = props.match.params;

  let service = new ProductService();

  useEffect(() => {
    loadProduct();
  }, []);

  let loadProduct = () => {
    service.getOneProduct(id).then((result) => {
      setProduct((product = result.data));
      setOwner((owner = result.data.owner));
    });
  };

  let decrement = () => {
    if (count <= 0) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className=" aspect-w-3 aspect-h-4 overflow-hidden lg:block">
            <img
              src={product?.img_url}
              className="w-full h-80 object-center px-4 lg:mx-0 object-fill lg:object-cover mb-6 lg:mb-0 rounded"
            />
          </div>
          <div className="lg:col-span-2 lg:pr-8 mx-8 lg:mx-4">
            {/* Reviews */}
            <div className="my-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-green-600 hover:text-green-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-4">
              {product?.name}
            </h1>
            <Link
              className="text-green-600 hover:text-green-500"
              to={`/seller/${owner?._id}`}
            >
              {owner?.username}
            </Link>
            <div className="grid grid-cols-12 gap-4 mb-6 mt-4">
              <div className="col-start-1 col-end-5 text-sm text-gray-900">
                Precio por unidad: {product?.price} €
              </div>
              <div className="col-end-7 col-span-2 ...">
                <button
                  type="button"
                  onClick={decrement}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  sm:text-sm"
                >
                  -
                </button>
              </div>
              <div className="select-none col-end-9 col-span-2 text-center pt-1 md:border-2 border-green-200 rounded-lg">
                {count}
              </div>
              <div className="col-end-11 col-span-2">
                <button
                  type="button"
                  onClick={() => setCount(count + 1)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  sm:text-sm"
                >
                  +
                </button>
              </div>
            </div>
            <Link
              to={"/cesta"}
              className="grid grid-cols-6 border-b-2 border-gray-200 pb-6"
            >
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="col-start-3 col-span-3 inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              >
                Añadir a la cesta
              </button>
            </Link>
            <div>
              <div className="space-y-6 mt-8">
                <p className="text-base text-gray-900 pb-4">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
