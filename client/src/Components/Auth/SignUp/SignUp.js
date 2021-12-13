import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import SignUpSeller from "./SignUpSeller";
import SignUpUser from "./SignUpUser";

export default function SignUp(props) {
  const [userForm, setUserForm] = useState(true);
  let changeToSeller = () => {
    setUserForm(true);
  };
  let changeToUser = () => {
    setUserForm(false);
  };

  return (
    <div className="max-h-screen relative bg-gray-800">
      <div className="relative pt-4 pb-10 sm:pb-28 bg-gray-800">
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

        <div className="mt-12 sm:mt-4 bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 ">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Unete a nosotros para apoyar el</span>
                    <span className="text-green-400 md:block">comercio local y de cercanía.</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    El comercio local supone una parte fundamental de la vida en los barrios. Los
                    pequeños negocios, combinados con otros servicios, generan un desarrollo
                    económico y social de gran impacto en las ciudades.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 sm:px-10 mx-10 ">
                {userForm ? (
                  <div className="md:flex sm:max-w-md sm:w-full sm:mx-auto mt-8 lg:mt-0">
                    <button
                      onClick={changeToUser}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-t-md text-black bg-white"
                    >
                      Registrate como empresa
                    </button>
                  </div>
                ) : (
                  <div className="md:flex sm:max-w-md sm:w-full sm:mx-auto mt-8 lg:mt-0">
                    <button
                      onClick={changeToSeller}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-t-md text-black bg-white"
                    >
                      Registrate como usuario
                    </button>
                  </div>
                )}
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto rounded-b-lg rounded-tr-lg sm:overflow-hidden ">
                  {userForm ? <SignUpSeller props={props} /> : <SignUpUser props={props} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
