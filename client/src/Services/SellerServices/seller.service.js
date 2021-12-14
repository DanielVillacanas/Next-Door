import axios from "axios";

class SellerService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/seller",
      withCredentials: true,
    });
  }
  createProduct = (name, price, description, img_url, owner) =>
    this.app.post("/create-new-product", {
      name,
      price,
      description,
      img_url,
      owner,
    });
  deleteProduct = (id) => this.app.get(`/deleteProduct/${id}`);
  getSeller = (id) => this.app.get(`/${id}`);
  editSeller = (data) => {
    debugger;
    return this.app.post("/edit", data);
  };
  getAllProductsFromASeller = (id) => this.app.get(`/${id}`);
  deleteProductFromSeller = (id) =>
    this.app.put(`/deleteProductFromSeller/${id}`);
}

export default SellerService;
