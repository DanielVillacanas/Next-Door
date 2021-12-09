import React, { useState } from "react";
import ReviewService from "../../../Services/ReviewService/reviews.service";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

const Options = [
  { value: "1", label: "1", checked: false },
  { value: "2", label: "2", checked: false },
  { value: "3", label: "3", checked: false },
  { value: "4", label: "4", checked: false },
  { value: "5", label: "5", checked: true },
];

export default function Reviews() {
  const [review, setReview] = useState({
    description: "",
    rating: 0,
  });

  let reviewService = new ReviewService();

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setReview((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    reviewService
      .createReview(review.description, review.rating)
      .then((response) => {})
      .catch((err) => console.log("error", err));
  };

  return (
    <>
      <div className="min-h-full">
        <main className="pb-10">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Notes
                      </h2>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form onSubmit={handleSubmit}>
                            <div>
                              <label htmlFor="comment" className="sr-only">
                                About
                              </label>
                              <textarea
                                id="comment"
                                onChange={handleInputChange}
                                name="review"
                                rows={4}
                                className="appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Añade un comentario"
                                defaultValue={""}
                              />
                            </div>
                            <h3 className="ml-5 mt-4">Deja tu nota</h3>
                            <div className="py-1 flex grid grid-cols-5">
                              {Options.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center px-4 py-2 ml-6"
                                >
                                  <input
                                    onChange={handleInputChange}
                                    id={option.value}
                                    name="radio-filter"
                                    defaultChecked={false}
                                    type="radio"
                                    className="h-4 w-4 border-black rounded text-green-600 focus:ring-green-500 "
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Comentar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a href="#" className="font-medium text-gray-900">
                                    {comment.name}
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{comment.body}</p>
                                </div>
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
        </main>
      </div>
    </>
  );
}
