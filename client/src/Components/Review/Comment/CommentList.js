import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CommentList(props) {
  const [viewComments, setViewComments] = useState(false);

  let showReviews = () => {
    setViewComments(!viewComments);
  };

  return (
    <div>
      <Disclosure
        as="div"
        className={
          viewComments !== true ? "border-b border-gray-200 pb-6 pt-4" : "pb-6"
        }
      >
        <>
          <h3 className="-my-3 flex justify-between">
            <div>
              <Disclosure.Button className=" bg-white w-full flex justify-start text-sm text-gray-400 hover:text-gray-500">
                {/* <span className="font-medium text-gray-900">{section.name}</span> */}
                <span className=" flex items-center">
                  {viewComments ? (
                    <>
                      <p
                        onClick={() => {
                          showReviews();
                        }}
                      >
                        Ocultar respuestas
                      </p>
                      <MinusSmIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        value={0}
                        onClick={() => {
                          showReviews();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => {
                          showReviews();
                        }}
                      >
                        Mostrar respuestas
                      </p>
                      <PlusSmIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={() => {
                          showReviews();
                        }}
                      />
                    </>
                  )}
                </span>
              </Disclosure.Button>
            </div>
          </h3>

          <Disclosure.Panel className="pt-6">
            <ul>
              {props.comment.comments.map((elm) => {
                return (
                  <li>
                    <div className="ml-10 mb-10 flex space-x-3 justify-between">
                      <div className="flex mt-2">
                        <div className="flex-shrink-0 ">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              elm.creatorUser != null
                                ? elm.creatorUser?.img_url
                                : elm.creatorSeller?.img_url
                            }
                            alt=""
                          />
                        </div>

                        <div className=" ml-2">
                          <div className="text-sm mx-2">
                            <Link
                              to={
                                elm.creatorUser != null
                                  ? `/user/${elm.creatorUser?._id}`
                                  : `/seller/${elm.creatorSeller?._id}`
                              }
                              className="font-medium text-gray-900"
                            >
                              {elm.creatorUser != null
                                ? elm.creatorUser?.username
                                : elm.creatorSeller?.username}
                            </Link>
                          </div>
                          <div className="mt-1 mx-5 text-sm text-gray-700">
                            <p>{elm.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Disclosure.Panel>
        </>
      </Disclosure>
    </div>
  );
}
