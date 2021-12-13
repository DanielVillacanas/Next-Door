import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { SubtotalContext } from "../../../Context/SubtotalContext/SubtotalContext";
import UserContext from "../../../Context/UserContext/UserContext";

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  let { subtotal } = useContext(SubtotalContext);
  let { loggedUser } = useContext(UserContext);
  let cart = loggedUser.loggedUser?.productsCart;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      const { data } = await axios.post(
        "http://localhost:5000/payment/checkout",
        {
          id,
          amount: subtotal * 100,
        }
      );
      if (data) {
        //limpiar el carro del usuario comprador
        props.history.push("/");
      }
    }
  };

  return (
    <div className="h-screen relative bg-gray-800">
      <div className="relative pt-6 pb-10 sm:pb-8 bg-gray-800 lg:pt-28">
        <div className="mt-12 sm:mt-4 bg-gray-800">
          <div className="mx-auto max-w-7xl ">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 ">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center ">
                <div class="h-full flex flex-col bg-white shadow-xl rounded-lg">
                  <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div class="flex items-start justify-between ">
                      <h2
                        class="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Tu cesta
                      </h2>
                      <div class="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span class="sr-only">Close panel</span>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </button>
                      </div>
                      <Link
                        to={"/products/cart"}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Volver a la cesta
                      </Link>
                    </div>
                    <p className="flex justify-start text-gray-400 text-sm mt-4">
                      Compruebe que su pedido esta completo
                    </p>
                    <div class="mt-8">
                      <div class="flow-root">
                        <ul class="-my-4 divide-y divide-green-500">
                          {cart.map((elm) => {
                            return (
                              elm.product && (
                                <li
                                  class="py-6 flex px-4 rounded-lg my-2 "
                                  key={elm._id}
                                >
                                  <div class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-black">
                                    <img
                                      src={elm.product.img_url}
                                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                      class="w-full h-full object-center object-cover "
                                    />
                                  </div>
                                  <div class="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{elm.product.name}</h3>
                                      </div>
                                    </div>
                                    <div class="flex-1 flex items-end justify-between ">
                                      <p class="text-gray-500">
                                        Cantidad: {elm.quantity}
                                      </p>
                                      <p class="ml-4">{elm.product.price}€</p>
                                    </div>
                                  </div>
                                </li>
                              )
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div class="flex justify-between text-base font-medium text-gray-900 pt-8 border-t-2 border-black">
                      <p>Subtotal</p>
                      <p>{subtotal}€</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-22 lg:mt-0 lg:col-span-6 sm:px-10 mx-10">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto rounded-lg sm:overflow-hidden lg:mt-12 ">
                  <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-2 px-4 shadow rounded-lg ">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tarjeta
                          </label>
                          <div className="mt-1">
                            <CardElement className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Telefono
                          </label>
                          <div className="mt-1">
                            <input
                              id="Direccion de envio"
                              placeholder="+34 ... ... ..."
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dirección de envio
                          </label>
                          <div className="mt-1">
                            <input
                              id="Direccion de envio"
                              value={loggedUser.loggedUser?.address}
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Comprar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-4 bg-gray-50 border-t-2 border-gray-200 sm:px-10 rounded-lg">
                    <p className="text-xs leading-5 text-gray-500">
                      Los plazos de entrega serán de 1 día para menos de 50km, 2
                      días para más de 50km y de 4 a 5 días para fuera de la
                      península.
                    </p>
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

export default CheckoutForm;
