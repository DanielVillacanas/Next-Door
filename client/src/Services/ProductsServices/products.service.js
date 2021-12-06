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
}

export default ProductService;
