import axios from "axios";

class ProductService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/allProducts",
      withCredentials: true,
    });
  }
  getAllProducts = () => this.app.get("/");
  getOneProduct = (id) => this.app.get(`/details/${id}`);
  addProductCart = (id, quantity) => this.app.get(`/cart/add?id=${id}&quantity=${quantity}`);
  getCartProducts = () => this.app.get("/cart/all");
  removeProductCart = (id) => this.app.put(`/cart/remove/${id}`);
}

export default ProductService;
