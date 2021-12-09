import React, { useEffect, useState } from "react";
import SellerService from "../../../Services/SellerServices/seller.service";
import SellerProductsCard from "./SellerProductsCard";

export default function SellerProducts(props) {
  let [products, setProducts] = useState();

  let service = new SellerService();
  useEffect(() => {
    getProductsFromSeller();
  }, []);

  let getProductsFromSeller = () => {
    return service
      .getAllProductsFromASeller(props.id)
      .then((res) => setProducts(res.data.products));
  };
  let bringProduct = (arrProd) => {
    let copy = [...products];
    arrProd && (copy = arrProd);
    setProducts(copy);
  };

  return (
    <div className="max-w-2xl mx-auto pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {
          //console.log("Aqui pinta---->", products),
          products?.map((product) => (
            <SellerProductsCard product={product} id={props.id} bringProduct={bringProduct} />
          ))
        }
      </div>
    </div>
  );
}
