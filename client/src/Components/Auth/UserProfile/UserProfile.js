import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EditProfile from "./EditProfile";
import ReviewListUser from "../../Review/ReviewListUser/ReviewListUser";
import ReviewService from "../../../Services/ReviewService/reviews.service";
import UserService from "../../../Services/UserSerivces/UserSerivces";
import { UserAddIcon } from "@heroicons/react/solid";

let reviewService = new ReviewService();
let userService = new UserService();

export default function UserProfile(props) {
  let user = props.loggedUser;

  const [isOpen, setOpen] = useState(false);
  const [showReviews, setshowReviews] = useState(false);
  const [ownerProfile, setOwnerProfie] = useState(props.match.params.id);
  const [owner, setOwner] = useState();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    console.log("Entra");
    loadOwner();
    setOwnerProfie(props.match.params.id);
    loadReviews();
  }, []);

  useEffect(() => {
    console.log("Entra");
    setOwnerProfie(props.match.params.id);
    loadOwner();
    loadReviews();
  }, [props.match.params.id]);

  let openModal = () => {
    setOpen(true);
  };

  let renderReviews = () => {
    return setshowReviews(true);
  };

  let closeReviews = () => {
    return setshowReviews(false);
  };

  let loadReviews = () => {
    reviewService
      .getReviewsOfThisUser(props.match.params.id)
      .then((result) => {
        setReviewList(result.data);
      })
      .catch((err) => console.log(err));
  };

  let loadOwner = () => {
    console.log(props.match.params.id);
    userService
      .getOwner(props.match.params.id)
      .then((result) => {
        console.log(result);
        setOwner(result.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bg-gray-900 pb-80">
        <div className="lg:flex lg:justify-between mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 ">
          <div className="lg:flex lg:justify-between my-auto ">
            <img
              className="h-40 mx-auto lg:mx-0 w-40 rounded-full xl:w-56 xl:h-56 lg:mr-20 my-auto"
              src={owner?.img_url}
              alt="User"
            />
            <div className="flex lg:justify-between justify-center mt-8 ">
              <div className="font-medium text-lg lg:text-start text-center lg:text-left ">
                <h3 className="text-white">
                  Nombre de Usuario: <h3>{owner?.username}</h3>{" "}
                </h3>
                <div className="text-white text-sm my-2">
                  Email:
                  <div className="text-green-300 text-sm my-2">{owner?.email}</div>
                </div>
                {user?._id === ownerProfile && (
                  <div className="text-green-300 text-sm my-2 max-w-sm ">
                    <div className="text-white pb-3 pt-3"> Direccion:</div>
                    <div> {owner?.address}</div>
                  </div>
                )}
                {user?._id === ownerProfile ? (
                  <div className="flex lg:justify-between justify-center grid grid-col-1 text-center ">
                    <button
                      type="button"
                      onClick={openModal}
                      className="mx-auto my-4 h-6 text-sm font-medium lg:mx-0 lg:text-left lg:w-20 text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                    >
                      Editar perfil
                    </button>
                    {showReviews === false ? (
                      <button
                        type="button"
                        onClick={renderReviews}
                        className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                      >
                        Mostrar mis comentarios
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={closeReviews}
                        className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                      >
                        Cerrar mis comentarios
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-between lg:grid">
                    {showReviews === false ? (
                      <button
                        type="button"
                        onClick={renderReviews}
                        className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                      >
                        Mostrar comentarios
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={closeReviews}
                        className="mx-auto my-4 h-6 text-sm font-medium  text-gray-300 border-b border-green-600 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                      >
                        Cerrar comentarios
                      </button>
                    )}
                  </div>
                )}

                <Transition.Root show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto "
                    onClose={setOpen}
                  >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0 "
                      >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      {/* This element is to trick the browser into centering the modal contents. */}
                      <span className=" sm:inline-block sm:align-middle sm:h-12" aria-hidden="true">
                        &#8203;
                      </span>
                      <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Fragment>
                          <EditProfile user={user} />
                        </Fragment>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>
              </div>
            </div>
          </div>
          {user?._id === ownerProfile && (
            <img src={owner?.map_img} className="mx-auto rounded-lg"></img>
          )}
        </div>
        {showReviews ? (
          <>
            <ReviewListUser id={ownerProfile} loggedUser={props.loggedUser} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
