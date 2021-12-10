import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../Services/AuthServices/auth.service";
import UploadService from "../../../Services/UploadServices/UploadServices";
import UserServices from "../../../Services/UserSerivces/UserSerivces";

export default function EditProfile(props) {
  const [user, setUser] = useState({
    username: props.user?.username,
    email: props.user?.email,
    password: "",
    password2: "",
    address: props.user?.address,
    img_url: "",
  });

  let userServices = new UserServices();
  let uploadService = new UploadService();

  const handleSubmit = () => {
    debugger;
    userServices
      .editUser(user)
      .then((response) => {
        props.storeUser(response);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleUploadChange = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then((response) => {
        setUser({ ...user, img_url: response.data.cloudinary_url });
      })
      .catch((err) => console.log("El error", { err }));
  };

  useEffect(() => {}, [user]);

  return (
    <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto rounded-b-lg rounded-tr-lg sm:overflow-hidden ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-2 px-4 shadow rounded-lg ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
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
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
            <div className="flex justify-center mt-8">
              <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  {!user.img_url && (
                    <>
                      <label className="inline-block mb-2 text-gray-500">New Photo</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-green-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center ">
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

                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Sube una foto
                            </p>
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
                  {user.img_url && (
                    <img
                      className="object-center object-cover w-32 h-32 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      src={user.img_url}
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
    </div>
  );
}
