import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";
import { Popover } from "@headlessui/react";

export default function SignUp(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
    address: "",
    username: "",
  });

  let authService = new AuthService();

  let handleSubmit = (e) => {
    e.preventDefault();

    authService
      .signup(
        user.username,
        user.email,
        user.password,
        user.password2,
        user.address
      )
      .then((response) => {
        props.storeUser(response.data);
        props.history.push("/tets");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div className="relative bg-gray-800 overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-end px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="md:flex mx-3">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              >
                Log in
              </Link>
            </div>
            <div className="md:flex mx-3 md:mr-16">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              >
                Home
              </Link>
            </div>
          </nav>
        </Popover>

        <main className="mt-12 sm:mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">
                      Unete a nosotros para apoyar el comercio local y de
                      cercanía.
                    </span>{" "}
                    <span className="text-indigo-400 md:block">
                      online business
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua ad ad non deserunt sunt.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-22 lg:mt-0 lg:col-span-6">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-3 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombre
                          </label>
                          <div className="mt-1">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              onChange={handleInputChange}
                              value={user.username}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dirección de correo
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              onChange={handleInputChange}
                              value={user.email}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Contraseña
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              onChange={handleInputChange}
                              value={user.password}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Comprobación de contraseña
                          </label>
                          <div className="mt-1">
                            <input
                              id="password2"
                              name="password2"
                              type="password"
                              onChange={handleInputChange}
                              value={user.password2}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dirección de envio
                          </label>
                          <div className="mt-1">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              onChange={handleInputChange}
                              value={user.address}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Registrate
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      registrandote estas de acuerdo con nuestros{" "}
                      <Link
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Terminos
                      </Link>
                      ,{" "}
                      <Link
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Política de datos
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Política de Cookies
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
