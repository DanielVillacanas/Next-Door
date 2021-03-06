import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import UserContext from "../../../Context/UserContext/UserContext";
import SellerService from "../../../Services/SellerServices/seller.service";

let service = new SellerService();

function SellerProductsCard(props) {
  const [isOpen, setOpen] = useState(false);

  let openModal = () => {
    setOpen(true);
  };

  let product = props.product;
  let id = props.product?._id;

  let loggedUser = useContext(UserContext);

  let eliminatePoduct = () => {
    setOpen(false);
    service.deleteProductFromSeller(id).then((res) => {
      props.bringProduct(res.data.products);
    });
    service
      .deleteProduct(id)
      .then((result) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div key={product._id} className="group border-4 border-white rounded-lg">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-sm overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={product.img_url}
            className="group w-full h-80 object-center object-cover bg-white "
            alt="Product"
          />
        </div>
        <div className="bg-gray-50 p-4">
          <h3 className="mt-4 text-sm text-black ">{product.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {product.price} €
          </p>
          <div>
            <div className="flex justify-between">
              <Link to={`/products/${id}`}>
                <button
                  type="button"
                  className="mt-4 px-2 shadow-sm text-sm font-medium text-black  border-b-2 border-green-500 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                >
                  Detalles de producto
                </button>
              </Link>
              {loggedUser !== null && loggedUser?._id === props?.id && (
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-4 px-2 shadow-sm text-sm font-medium text-black  border-b-2 border-red-900 transition duration-500 ease-in-out transform hover:scale-90 hover:translate-y-1"
                >
                  Borrar producto
                </button>
              )}
            </div>
            <Transition.Root show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
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
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                      <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Eliminar producto de la tienda
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              ¿Estas seguro de que quieres eliminar
                              <span className="text-black">{product.name}</span>
                              de la tienda? Si acepta se borrara toda la
                              informacion de este producto haciendo esta acción
                              irremediable.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => eliminatePoduct()}
                        >
                          Borrar producto
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellerProductsCard;
