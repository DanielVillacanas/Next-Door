import axios from "axios";

class MessageService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/message",
      withCredentials: true,
    });
  }
  createMessage = (text, sender, conversationId) =>
    this.app.post("/new-message", { text, sender, conversationId });
  getMessages = (id) => this.app.get(`/${id}`);
}

export default MessageService;
