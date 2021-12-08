import React from "react";
import SellerProductsCard from "./SellerProductsCard";

export default function SellerProducts(props) {
  return (
    <div className="max-w-2xl mx-auto pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {props.products?.map((product) => (
          <SellerProductsCard product={product} id={props.id} />
        ))}
      </div>
    </div>
  );
}
