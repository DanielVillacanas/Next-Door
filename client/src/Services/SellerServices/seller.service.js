import axios from "axios";

class SellerService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/seller",
      withCredentials: true,
    });
  }

  getSeller = (id) => this.app.get(`/${id}`);
}

export default SellerService;
