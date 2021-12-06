import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";
import { Popover } from "@headlessui/react";

export default function SignUpSeller() {
  const [seller, setSeller] = useState({
    email: "",
    password: "",
    password2: "",
    img_url: "",
    address: "",
    username: "",
    type: "Other",
    description: "",
  });

  let authService = new AuthService();

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setSeller((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let handleInputSelect = (e) => {
    let value = e.currentTarget.value;
    setSeller((prevState) => {
      return {
        ...prevState,
        type: value,
      };
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    authService.signUpSeller(
      seller.username,
      seller.email,
      seller.password,
      seller.password2,
      seller.address,
      seller.type
    );
    //   .then((response) => {
    //     props.storeUser(response.data);
    //     props.history.push("/tets");
    //   })
    //   .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="max-h-screen relative bg-gray-800">
      <div className="relative pt-6 pb-10 sm:pb-8 bg-gray-800">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-end px-4 sm:px-6"
            aria-label="Global"
          >
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

        <main className="mt-12 sm:mt-4 bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Unete a nosotros para apoyar el</span>{" "}
                    <span className="text-green-400 md:block">comercio local y de cercanía.</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    El comercio local supone una parte fundamental de la vida en los barrios. Los
                    pequeños negocios, combinados con otros servicios, generan un desarrollo
                    económico y social de gran impacto en las ciudades.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-22 lg:mt-0 lg:col-span-6">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md ">
                    <div className="bg-white py-2 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombre de la empresa
                          </label>
                          <div className="mt-1">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              onChange={handleInputChange}
                              value={seller.username}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                              value={seller.email}
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
                            Contraseña
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              onChange={handleInputChange}
                              value={seller.password}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                              value={seller.password2}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dirección de la empresa
                          </label>
                          <div className="mt-1">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              onChange={handleInputChange}
                              value={seller.address}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tipo de comercio
                          </label>
                          <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            defaultValue="Other"
                            onChange={handleInputSelect}
                          >
                            <option>Carnes</option>
                            <option>Frutas</option>
                            <option>Pescados</option>
                            <option>Verduras</option>
                            <option>Otro</option>
                          </select>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Registrate
                          </button>
                        </div>
                      </form>
                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">o inicia sesión</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          to="/login"
                          className="mt-6 w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Login
                        </Link>
                      </div>
                    </div>
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
