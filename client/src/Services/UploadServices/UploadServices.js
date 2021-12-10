import axios from "axios";

class UploadService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/upload",
    });
  }

  uploadImage = (imageData) => this.app.post("/image", imageData);
}

export default UploadService;
