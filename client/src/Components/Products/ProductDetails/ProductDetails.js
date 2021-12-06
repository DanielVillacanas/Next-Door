import React, { useEffect, useState } from "react";
import ProductService from "../../../Services/ProductsServices/products.service";

export default function ProductDetails(props) {
  let [product, setProduct] = useState(props);
  const { id } = props.match.params;

  let service = new ProductService();

  useEffect(() => {
    loadProduct();
  }, []);

  let loadProduct = () => {
    service.getOneProduct(id).then((result) => {
      console.log(result);
      setProduct((product = result.data));
    });
  };

  return <div>{product.name}</div>;
}
