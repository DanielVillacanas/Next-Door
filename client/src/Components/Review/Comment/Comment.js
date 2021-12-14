import React, { useState } from "react";
import ReviewService from "../../../Services/ReviewService/reviews.service";

export default function Comment(props) {
  const [comment, setComment] = useState({
    creator: props.user._id,
    description: "",
    review: props.review,
  });

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setComment((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let handleSubmmit = (e) => {
    e.preventDefault();
    commentService
      .createComment(comment)
      .then((res) => {
        setComment({ creator: props.user._id, description: "", review: props.review });
        props.loadReviews();
      })
      .catch((err) => console.log(err));
  };

  let commentService = new ReviewService();
  return (
    <form className="mt-5" onSubmit={handleSubmmit}>
      <textarea
        onChange={handleInputChange}
        placeholder="Respuesta..."
        name="description"
        value={comment.description}
        className="appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      ></textarea>
      <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-5">
        Enviar
      </button>
    </form>
  );
}
