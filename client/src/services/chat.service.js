import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000";

class ChatService {
  //   getChatRooms(id) {
  getChatRooms() {
    return axios.get(`${API_URL}/chatroom/chatrooms/`);
  }

  getChatRoomMessages(chatRoomName) {
    return axios.get(`${API_URL}/chatroom/chatroom/messages/${chatRoomName}`);
  }

  joinRoom(room) {
    return axios.post(`${API_URL}/chatroom/`, { room });
  }
}

export default new ChatService();
