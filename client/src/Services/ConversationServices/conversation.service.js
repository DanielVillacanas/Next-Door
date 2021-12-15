import axios from "axios";

class ConversationService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5000/api/conversation",
      withCredentials: true,
    });
  }
  getConversations = (id) => this.app.get(`/${id}`);
  getNewConversation = (senderId, receiverId) =>
    this.app.post(`/?senderId=${senderId}&receiverId=${receiverId}`);
}

export default ConversationService;
