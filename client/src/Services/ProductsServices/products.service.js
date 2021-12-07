import axios from "axios";

class ProductService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/allProducts",
      withCredentials: true,
    });
  }
  getAllProducts = () => this.app.get("/");
  createProduct = (name, price, description, img_url, owner) =>
    this.app.post("/create-new-product", {
      name,
      price,
      description,
      img_url,
      owner,
    });
  getOneProduct = (id) => this.app.get(`/details/${id}`);
  getAllProductsFromASeller = (id) => this.app.get(`/seller/${id}`);
}

export default ProductService;
