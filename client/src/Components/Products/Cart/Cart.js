import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubtotalContext } from "../../../Context/SubtotalContext/SubtotalContext";
import ProductService from "../../../Services/ProductsServices/products.service";

const service = new ProductService();

export default function Cart(props) {
  let [cart, setCart] = useState([]);
  let { subtotal, setSubtotal } = useContext(SubtotalContext);

  let getAllCart = () => {
    service.getCartProducts().then((result) => {
      setCart(result.data.productsCart);
      setSubtotal((subtotal = 0));
      result.data.productsCart.forEach((element) => {
        element.product &&
          setSubtotal(
            Math.round((subtotal += element.product?.price * element.quantity) * 100) / 100
          );
      });
    });
  };

  let removeFromCart = (id) => {
    service
      .removeProductCart(id)
      .then(() => {
        getAllCart();
        props.loadUser();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <div className="bg-gray-900">
      <div class="local inset-y-0 right-0 pl-10 pr-10 max-w-full flex pt-10 pb-80 ">
        <div class="w-screen ">
          <div class="h-full flex flex-col bg-white shadow-xl rounded-3xl">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                  Tu cesta
                </h2>
                <div class="ml-3 h-7 flex items-center">
                  <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Cerrar panel</span>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </button>
                </div>
              </div>
              <div class="mt-8">
                <div class="flow-root">
                  <ul class="-my-6 divide-y divide-gray-200">
                    {cart.map((elm) => {
                      return (
                        elm.product && (
                          <li class="py-6 flex" key={elm._id}>
                            <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={elm.product.img_url}
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                class="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div class="ml-4 flex-1 flex flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="hover:text-green-500">
                                    <Link to={`/products/${elm.product._id}`}>
                                      {elm.product.name}
                                    </Link>
                                  </h3>
                                  <p class="ml-4">{elm.product.price}€</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  Vendedor:
                                  <Link
                                    to={`/seller/${elm.product.owner?._id}`}
                                    class="mt-1 text-sm text-gray-500 hover:text-green-500"
                                  >
                                    {elm.product.owner?.username}
                                  </Link>
                                </p>
                              </div>
                              <div class="flex-1 flex items-end justify-between ">
                                <p class="text-gray-500">Cantidad: {elm.quantity}</p>
                                <div class="flex">
                                  <button
                                    onClick={() => removeFromCart(elm._id)}
                                    type="button"
                                    class="font-medium text-green-600 hover:text-green-500"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{subtotal}€</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">
                Gastos de envio y de gestion calculados en el coste total.
              </p>
              <div class="mt-6 flex sm:justify-end justify-center">
                <Link
                  to={"/payment"}
                  class="w-44 flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Comprar
                </Link>
              </div>
              <div class="mt-6 flex sm:justify-end justify-center text-sm text-center text-gray-500">
                <p>
                  o
                  <Link to="/products">
                    <button type="button" class="text-green-600 font-medium hover:text-green-500 ">
                      Continuar comprando<span aria-hidden="true"> →</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
