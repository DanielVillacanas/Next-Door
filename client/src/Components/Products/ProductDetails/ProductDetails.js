import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";

export default function BeersDetails(props) {
  let [product, setProduct] = useState();
  const { id } = props.match.params;
  console.log(id);
  let service = new ProductService();

  useEffect(() => {
    loadProduct();
  }, []);

  let loadProduct = () => {
    service.getOneProduct(id).then((result) => {
      setProduct((product = result));
    });
  };

  return <div>Holaaa</div>;
}
