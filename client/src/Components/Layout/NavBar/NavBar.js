import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Dialog, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusSmIcon } from "@heroicons/react/solid";
import NewProduct from "../../Products/NewProduct/NewProduct";
import AuthService from "../../../Services/AuthServices/auth.service";
import LogoWhite from "../../../images/LogoWhite.svg";
import { navigation, notLogged } from "../../../Const/Const";

const authService = new AuthService();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar(props) {
  let logged = props.loggedUser;

  const [cartLength, setcartLength] = useState(0);

  if (logged === null) {
    logged = undefined;
  }
  const [isOpen, setOpen] = useState(false);

  let openModal = () => {
    setOpen(true);
  };

  let closeModal = () => {
    setOpen(false);
  };
  let logOut = () => {
    authService
      .logout()
      .then((response) => {
        props.loadUser();
        props.history.push("/logIn");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.loggedUser != null &&
      setcartLength(props.loggedUser?.productsCart?.length);
  });

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Link to={"/"}>
                    <img
                      className="hidden lg:block h-16 w-auto"
                      src={LogoWhite}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : true}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {notLogged.map(
                    (item) =>
                      logged === undefined && (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      )
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {logged?.role === "Seller" && (
                  <button
                    type="button"
                    onClick={openModal}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <PlusSmIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Nuevo Producto</span>
                  </button>
                )}
                {logged?.role === "User" && !props.home && (
                  <Link className="flex-shrink-0" to="/products/cart">
                    <button type="button" className="">
                      <span className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                        <span className="mr-2">
                          {
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-6 w-6"
                              fill=""
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          }
                        </span>
                        Cesta :
                        <div className="container ml-2 rounded-full bg-green-600 text-white w-6 h-6 text-center">
                          <div className="mx-auto h-full my-auto mt-0.5">
                            {cartLength}
                          </div>
                        </div>
                      </span>
                    </button>
                  </Link>
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

                      <span
                        className=" sm:inline-block sm:align-middle sm:h-12"
                        aria-hidden="true"
                      >
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
                          <NewProduct
                            refreshProducts={props.refreshProducts}
                            loggedUser={logged}
                            history={props.history}
                            close={closeModal}
                          />
                        </Fragment>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>
                {logged && !props.home && (
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={logged.img_url}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item key="Your Profile">
                            {({ active }) => (
                              <>
                                {logged?.role === "Seller" && (
                                  <Link
                                    to={`/seller/${logged._id}`}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Tu tienda
                                  </Link>
                                )}
                                {logged?.role === "User" && (
                                  <Link
                                    to={`/user/${logged._id}`}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Tu perfil
                                  </Link>
                                )}
                              </>
                            )}
                          </Menu.Item>
                          <Menu.Item key="Sign out">
                            {({ active }) => (
                              <Link
                                to={"/logOut"}
                                onClick={logOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Cerrar sesión
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {logged === undefined &&
                notLogged.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
            {logged && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={logged.img_url}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {logged.username}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {logged.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1 sm:px-3">
                  <Disclosure.Button
                    key="Your Profile"
                    as={Link}
                    to={"/"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Link
                    key="Sign out"
                    as={Link}
                    to={"/logOut"}
                    onClick={logOut}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
