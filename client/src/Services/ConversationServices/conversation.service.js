import axios from "axios";

class ConversationService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/conversation`,
      withCredentials: true,
    });
  }
  getConversations = (id) => this.app.get(`/${id}`);
  getNewConversation = (senderId, receiverId) =>
    this.app.post(`/?senderId=${senderId}&receiverId=${receiverId}`);
  findConversation = (sellerId) => this.app.get(`/findConversation/${sellerId}`);
}

export default ConversationService;
