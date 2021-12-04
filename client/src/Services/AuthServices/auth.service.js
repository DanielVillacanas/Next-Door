import axios from "axios";

class AuthService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/auth",
      withCredentials: true,
    });
  }

  login = (email, paswword) => this.app.post("/login", { email, paswword });
  //   login = (username, pwd) => this.app.post("/login", { username, pwd })
  //   logout = () => this.app.get("/logout")
  //   isloggedin = () => this.app.get("/isloggedin")
}

export default AuthService;
