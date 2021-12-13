import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";

let authService = new AuthService();

export default function SignUpSeller(props) {
  const [seller, setSeller] = useState({
    email: "",
    password: "",
    password2: "",
    img_url: "",
    address: "",
    username: "",
    type: "Carnes",
    description: "",
  });
  const [errSingUp, setErr] = useState();
  const [errMessage, setError] = useState(undefined);
  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    if (e.currentTarget.name === "password2" && e.currentTarget.value !== "") {
      e.currentTarget.value !== seller.password
        ? setError("Las contraseñas no coinciden")
        : setError(undefined);
    }
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
    !errMessage &&
      authService
        .signUpSeller(
          seller.username,
          seller.email,
          seller.password,
          seller.password2,
          seller.address,
          seller.type
        )
        .then((response) => {
          console.log(response);
          props.props.loadUser();
          props.props.history.push("/products");
        })
        .catch((err) => setErr(err.response.data));
    // .catch((err) => console.log(err.response?.data.message));
  };
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-2 px-4 shadow rounded-lg ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
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
                {errMessage && <p className="text-red-500">{errMessage}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo de comercio
              </label>
              <select
                id="type"
                name="type"
                className=" border-2 border-green-500 mt-3 block w-full pl-1 pr-10 py-2 text-base focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                defaultValue="Carnes"
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
            <div>
              {errSingUp && (
                <p className="text-red-500 text-center">
                  Error al registrar usuario compruebe que la dirección es correcta y que no empieza
                  por C/
                </p>
              )}
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
              className="mt-6 w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login
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
    </>
  );
}
