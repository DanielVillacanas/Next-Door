import axios from "axios";

class ProductService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/allProducts`,
      withCredentials: true,
    });
  }
  getAllProducts = (page, limit) => this.app.get(`/?page=${page}&limit=${limit}`);
  getOneProduct = (id) => this.app.get(`/details/${id}`);
  addProductCart = (id, quantity) => this.app.get(`/cart/add?id=${id}&quantity=${quantity}`);
  getCartProducts = () => this.app.get(`/cart/all`);
  removeProductCart = (id) => this.app.put(`/cart/remove/${id}`);
  removeCart = () => this.app.put(`/cart/removeAll`);
}

export default ProductService;
