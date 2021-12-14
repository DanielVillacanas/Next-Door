import axios from "axios";

class ReviewService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/reviews",
      withCredentials: true,
    });
  }
  createReview = (description, rating, product, seller) =>
    this.app.post("/create-new-review", {
      description,
      rating,
      product,
      seller,
    });
  getReviewsOhThis = (id, type) => this.app.get(`/?id=${id}&type=${type}`);
  getReviewsOfThisUser = (id) => this.app.get(`/user/${id}`);
  deleteThisReview = (id) => this.app.delete(`/remove/${id}`);

  createComment = (creator, description, review) =>
    this.app.post("/create-new-comment", creator, description, review);
}

export default ReviewService;
