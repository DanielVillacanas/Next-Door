import axios from "axios";

class ReviewService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/reviews",
      withCredentials: true,
    });
  }
  createReview = (description, rating) =>
    this.app.post("/create-new-product", {
      description,
      rating,
    });
}

export default ReviewService;
