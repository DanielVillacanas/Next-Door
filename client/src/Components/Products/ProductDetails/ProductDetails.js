import React, { useEffect, useState, useContext } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import UserContext from "../../../Context/UserContext/UserContext";
import ReviewList from "../../Review/ReviewList/ReviewList";
import ReviewService from "../../../Services/ReviewService/reviews.service";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let reviewService = new ReviewService();
let service = new ProductService();

export default function ProductsDetails(props) {
  const [reviewList, setReviewList] = useState([]);

  let loggedUser = useContext(UserContext);

  let [count, setCount] = useState(1);
  let [product, setProduct] = useState();
  let [owner, setOwner] = useState();

  const { id } = props.match.params;

  let sum = 0;

  reviewList.forEach((review) => (sum += review.rating));

  let averageTotal = Math.floor(sum / reviewList.length);

  const reviews = { average: averageTotal, totalCount: reviewList.length };

  useEffect(() => {
    loadReviews();
    loadProduct();
  }, []);

  let loadProduct = () => {
    service.getOneProduct(id).then((result) => {
      setProduct((product = result.data));
      setOwner((owner = result.data.owner));
    });
  };

  let loadReviews = () => {
    reviewService
      .getReviewsOhThis(id, "product")
      .then((result) => {
        setReviewList(result.data);
      })
      .catch((err) => console.log(err));
  };

  let decrement = () => {
    if (count <= 1) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  let addProductCart = () => {
    service.addProductCart(product._id, count).then(() => {
      props.loadUser();
      props.history.push("/products/cart");
    });
  };

  return (
    <div className="bg-white">
      <div className="py-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className=" aspect-w-3 aspect-h-4 overflow-hidden lg:block rounded-lg">
            <img
              src={product?.img_url}
              className="px-4 w-full h-90 object-center lg:mx-0 lg:px-0 lg:object-cover object-contain mb-6 lg:mb-0 rounded-lg "
            />
          </div>
          <div className="lg:col-span-2 lg:pr-8 mx-8 lg:mx-4">
            {/* Reviews */}
            <div className="my-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? "text-green-500" : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <p href={reviews.href} className="ml-3 text-sm font-medium text-green-600 ">
                  {reviews.totalCount} reviews
                </p>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-4">
              {product?.name}
            </h1>
            <Link className="text-green-600 hover:text-green-500" to={`/seller/${owner?._id}`}>
              {owner?.username}
            </Link>
            <div className="grid grid-cols-12 gap-4 mb-6 mt-4">
              <div className="col-start-1 col-end-5 text-sm text-gray-900">
                Precio por unidad: {product?.price} €
              </div>

              {(loggedUser === null || loggedUser?.role === "User") && (
                <>
                  <div className="col-end-7 col-span-2">
                    <button
                      type="button"
                      onClick={decrement}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  sm:text-sm"
                    >
                      -
                    </button>
                  </div>
                  <div className="col-end-9 col-span-2 text-center pt-2">{count}</div>
                  <div className="col-end-11 col-span-2">
                    <button
                      type="button"
                      onClick={() => setCount(count + 1)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  sm:text-sm"
                    >
                      +
                    </button>
                  </div>
                </>
              )}
            </div>
            {(loggedUser === null || loggedUser?.role === "User") && (
              <>
                <div className="grid grid-cols-6 border-b-2 border-gray-200 pb-8">
                  <button
                    type="button"
                    onClick={addProductCart}
                    className="col-start-3 col-span-3 inline-flex justify-center rounded-md border border-transparent shadow-sm py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                  >
                    Añadir a la cesta
                  </button>
                </div>
              </>
            )}
            <div>
              <div className="space-y-6 mt-8">
                <p className="text-base text-gray-900 ">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>

        <ReviewList ProductId={id} loadProduct={loadProduct} loadReviewsFather={loadReviews} />
      </div>
    </div>
  );
}
