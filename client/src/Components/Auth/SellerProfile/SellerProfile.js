import React, { useState, useEffect } from "react";
import SellerProducts from "../../Products/SellerProducts/SellerProducts";
import SellerService from "../../../Services/SellerServices/seller.service";

export default function SellerProfile(props) {
  let [seller, setSeller] = useState();
  const { id } = props.match.params;

  let service = new SellerService();
  useEffect(() => {
    loadSeller();
  }, []);

  let loadSeller = () => {
    service.getSeller(id).then((result) => {
      setSeller((seller = result.data));
    });
  };
  return (
    <div className="bg-gray-900 ">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 ">
        <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={seller?.img_url} />
        <div className=" xl:flex xl:items-center xl:justify-between mt-8">
          <div className="font-medium text-lg leading-6 mx-auto text-center">
            <h3 className="text-white mb-4">{seller?.username}</h3>
            <div className="text-green-400 mb-8">{seller?.address}</div>
            <div className=" text-white">{seller?.description}</div>
          </div>
        </div>
      </div>
      <SellerProducts products={seller?.products} id={id} />
    </div>
  );
}
