import axios from "axios";

class SellerService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/seller",
      withCredentials: true,
    });
  }
  createProduct = ({ name, price, description, img_url, owner }) => {
    return this.app.post("/create-new-product", {
      name,
      price,
      description,
      img_url,
      owner,
    });
  };
  deleteProduct = (id) => this.app.get(`/deleteProduct/${id}`);
  getSeller = (id) => this.app.get(`/${id}`);
  editSeller = (
    username,
    email,
    password,
    password2,
    description,
    address,
    img_url
  ) => {
    return this.app.post(
      "/edit",
      username,
      email,
      password,
      description,
      address,
      img_url
    );
  };
  getAllProductsFromASeller = (id) => this.app.get(`/${id}`);
  deleteProductFromSeller = (id) =>
    this.app.put(`/deleteProductFromSeller/${id}`);
}

export default SellerService;
