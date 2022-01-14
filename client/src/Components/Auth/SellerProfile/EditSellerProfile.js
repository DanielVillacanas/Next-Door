import React, { useEffect, useState } from "react";

import UploadService from "../../../Services/UploadServices/UploadServices";
import SellerServices from "../../../Services/SellerServices/seller.service";

let sellerServices = new SellerServices();
let uploadService = new UploadService();

export default function EditSellerProfile(props) {
  const [seller, setSeller] = useState({
    username: props.seller?.username,
    email: props.seller?.email,
    password: "",
    password2: "",
    description: props.seller?.description,
    address: props.seller?.address,
    img_url: "",
  });
  const [loadingImg, setLoadingImg] = useState(false);
  const [errMessage, setError] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    !errMessage &&
      sellerServices
        .editSeller(seller)
        .then(() => {
          props.closeModal();
          props.loadSeller();
        })
        .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
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

  const handleUploadChange = (e) => {
    setLoadingImg(true);
    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then((response) => {
        setLoadingImg(false);
        setSeller({ ...seller, img_url: response.data.cloudinary_url });
      })
      .catch((err) => console.log("El error", { err }));
  };

  useEffect(() => {}, [seller]);

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <p className="text-center font-semibold text-lg text-green-800">Editar perfil</p>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>

            <div className="mt-1">
              <textarea
                id="description"
                rows={6}
                name="description"
                type="text"
                onChange={handleInputChange}
                value={seller.description}
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
          <div className="flex justify-center mt-8">
            <div className="max-w rounded-lg shadow-xl bg-white">
              <div className="m-4">
                {!seller.img_url && (
                  <>
                    <label className="inline-block mb-2 text-gray-500">Nueva foto</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-4 border-green-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600 pt-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          {!loadingImg && (
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Sube una foto
                            </p>
                          )}
                          {loadingImg && (
                            <button
                              type="button"
                              class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-green-500 hover:bg-green-400 transition ease-in-out duration-150 cursor-not-allowed"
                              disabled=""
                            >
                              <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Cargando...
                            </button>
                          )}
                        </div>

                        <input
                          type="file"
                          name="imageData"
                          className="opacity-0"
                          onChange={handleUploadChange}
                        />
                      </label>
                    </div>
                  </>
                )}
                {seller.img_url && (
                  <img
                    className="object-center object-cover w-32 h-32 text-gray-400 group-hover:text-gray-600 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={seller.img_url}
                    alt=""
                  />
                )}
              </div>
              <div className="flex justify-center p-2"></div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
