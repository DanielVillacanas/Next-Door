import axios from "axios";

class AuthService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/auth",
      withCredentials: true,
    });
  }

  login = (email, password) => this.app.post("/login", { email, password });
  signup = (username, email, password, password2, address) => {
    this.app.post("/signup", { username, email, password, address });
  };
  logout = () => this.app.get("/logout");
  isloggedin = () => this.app.get("/isloggedin");
}

export default AuthService;
