import React, { useState, useEffect, useContext } from "react";
import ReviewService from "../../../Services/ReviewService/reviews.service";
import UserContext from "../../../Context/UserContext/UserContext";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let reviewService = new ReviewService();

export default function ReviewsUser(props) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  let deleteReview = (id) => {
    reviewService
      .deleteThisReview(id)
      .then((result) => {
        loadReviews();
        if (props.ProductId) {
          props.loadReviewsFather();
        }
      })
      .catch((err) => console.log(err));
  };

  let loadReviews = () => {
    reviewService
      .getReviewsOfThisUser(props.id)
      .then((result) => {
        setReviewList(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="min-h-full">
        <div className="pb-10">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Comentarios del usuario
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {reviewList.map((comment) => (
                          <li key={comment.id}>
                            <div className="flex space-x-3 justify-between">
                              <div className="flex">
                                <div className=" ml-2">
                                  <div className="lg:col-span-2 lg:pr-8 mx-4 mt-2 ">
                                    <div className="flex items-center">
                                      <div className="flex items-center ">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                          <StarIcon
                                            key={rating}
                                            className={classNames(
                                              comment.rating > rating
                                                ? "text-green-500"
                                                : "text-gray-200",
                                              "h-5 w-5 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-1 mx-5 text-sm text-gray-700">
                                    <p>{comment.description}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex place-items-end">
                                {props.id === comment.creator._id && (
                                  <button
                                    type="button"
                                    onClick={() => deleteReview(comment._id)}
                                    className="mt-4 h-6 text-sm font-sm text-gray-300 border-b border-red-900 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                                  >
                                    Borrar
                                  </button>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
