import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";
import { Popover } from "@headlessui/react";

let authService = new AuthService();

function LoginPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setError] = useState(undefined);

  let handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(user.email, user.password)
      .then((response) => {
        props.history.push("/products");
        props.storeUser(response.data.user);
        props.setTypeBussines(response.data.type);
      })
      .catch((err) => setError(err.response.data));
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
    <div className="h-screen relative bg-gray-800">
      <div className="relative pt-6 pb-10 sm:pb-8 bg-gray-800">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-end px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="md:flex mx-3 md:mr-16 mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              >
                Home
              </Link>
            </div>
          </nav>
        </Popover>

        <div className="mt-12 sm:mt-4 bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Inicia sesión y accede a</span>
                    <span className="text-green-400 md:block">
                      miles de productos ecologicos y de cercanía
                    </span>
                  </h1>
                </div>
              </div>
              <div className="mt-16 sm:mt-22 lg:mt-0 lg:col-span-6 sm:px-10 mx-10">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto rounded-lg sm:overflow-hidden lg:mt-12">
                  <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-2 px-4 shadow rounded-lg ">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              onChange={handleInputChange}
                              value={user.email}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              onChange={handleInputChange}
                              value={user.password}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="remember-me"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <a href="#" className="font-medium text-green-600 hover:text-green-500">
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Log in
                          </button>
                        </div>
                      </form>

                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">o crea una cuenta</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          to="/signUp"
                          className="mt-6 w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:text-white hover:bg-green-600"
                        >
                          Registrate
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10 rounded-lg">
                    <p className="text-xs leading-5 text-gray-500">
                      Registrandote estas de acuerdo con nuestros
                      <Link href="#" className="font-medium text-gray-900 hover:underline">
                        Terminos
                      </Link>
                      ,
                      <Link href="#" className="font-medium text-gray-900 hover:underline">
                        Política de datos
                      </Link>
                      and
                      <Link href="#" className="font-medium text-gray-900 hover:underline">
                        Política de Cookies
                      </Link>
                      .
                    </p>
                  </div>
                  <div>
                    {errorLogin && (
                      <p className="font-medium text-red-600 hover:text-red-500 text-center pb-5">
                        {errorLogin}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
