import React, { useState, useEffect } from "react";
import SellerProducts from "../../Products/SellerProducts/SellerProducts";
import SellerService from "../../../Services/SellerServices/seller.service";
import ReviewList from "../../Review/ReviewList/ReviewList";
import ReviewService from "../../../Services/ReviewService/reviews.service";

let service = new SellerService();
let reviewService = new ReviewService();

export default function SellerProfile(props) {
  let [seller, setSeller] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [showProduts, setshowProduts] = useState(false);
  const [showReviews, setshowReviews] = useState(false);
  const { id } = props.match.params;

  useEffect(() => {
    if (!seller) {
      loadSeller();
    }
    loadReviews();
  }, []);

  let renderProducts = () => {
    return setshowProduts(true), setshowReviews(false);
  };

  let renderReviews = () => {
    return setshowProduts(false), setshowReviews(true);
  };

  let loadSeller = () => {
    service.getSeller(id).then((result) => {
      setSeller((seller = result.data));
    });
  };

  let loadReviews = () => {
    reviewService
      .getReviewsOhThis(id, "seller")
      .then((result) => {
        setReviewList(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-900 ">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 ">
        <img
          className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
          src={seller?.img_url}
        />
        <div className=" xl:flex xl:items-center xl:justify-between mt-8">
          <div className="font-medium text-lg leading-6 mx-auto text-center">
            <h3 className="text-white mb-4">{seller?.username}</h3>
            <div className="text-green-400 mb-8">{seller?.address}</div>
            <div className=" text-white">{seller?.description}</div>
          </div>
        </div>
      </div>
      {(showProduts || showReviews) === false && (
        <div className="flex pb-40">
          <button
            type="button"
            onClick={renderProducts}
            className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
          >
            Mostrar productos
          </button>
          <button
            type="button"
            onClick={renderReviews}
            className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
          >
            Mostrar comentarios
          </button>
        </div>
      )}
      {showProduts ? (
        <>
          <div className="flex">
            <button
              type="button"
              onClick={renderReviews}
              className="mx-auto mb-10 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
            >
              Mostrar comentarios
            </button>
          </div>

          <SellerProducts products={seller?.products} id={id} />
        </>
      ) : (
        <></>
      )}
      {showReviews ? (
        <>
          <div className="flex">
            <button
              type="button"
              onClick={renderProducts}
              className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
            >
              Mostrar productos
            </button>
          </div>
          <ReviewList SellerId={id} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
