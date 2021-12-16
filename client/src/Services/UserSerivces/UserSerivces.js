import axios from "axios";

class UserServices {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
      withCredentials: true,
    });
  }

  editUser = (username, email, password, password2, address, img_url) => {
    return this.app.post("/edit", username, email, password, address, img_url);
  };
  getOwner = (id) => this.app.get(`/user/${id}`);
}

export default UserServices;
