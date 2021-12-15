import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";

let authService = new AuthService();

export default function SignUp(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
    address: "",
    username: "",
  });
  const [errMessage, setError] = useState(undefined);

  let handleSubmit = (e) => {
    e.preventDefault();
    !errMessage &&
      authService
        .signUp(
          user.username,
          user.email,
          user.password,
          user.password2,
          user.address
        )
        .then((response) => {
          props.props.loadUser();
          props.props.history.push("/products");
        })
        .catch((err) => console.log("USER", err));
  };

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    if (e.currentTarget.name === "password2" && e.currentTarget.value !== "") {
      e.currentTarget.value !== user.password
        ? setError("Las contraseñas no coinciden")
        : setError(undefined);
    }
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-2 px-4 shadow rounded-lg ">
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
                  value={user.password2}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errMessage && <p className="text-red-500">{errMessage}</p>}
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
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
                <span className="px-2 bg-white text-gray-500">
                  o inicia sesión
                </span>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/login"
              className="mt-6 w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:text-white hover:bg-green-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 bg-gray-50 border-t-2 border-gray-200 sm:px-10 ">
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
    </>
  );
}
