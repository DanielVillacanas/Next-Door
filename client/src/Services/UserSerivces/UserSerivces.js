import axios from "axios";

class UserServices {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/user",
      withCredentials: true,
    });
  }

  editUser = (username, email, password, password2, address, img_url) => {
    this.app.post("/edit", username, email, password, address, img_url);
  };
}

export default UserServices;
