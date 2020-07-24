import axios from "axios";
import authHeader from "./auth-header";

//test
const API_URL = "http://localhost:5000/api/likes/";

class LikesService {
  // TODO: Fix these
  getAllFromUser(id) {
    return axios.get(API_URL + id);
  }

  create(otherUserId, liked, userId) {
    return axios.post(API_URL, { otherUserId, liked, userId });
  }
}

export default new LikesService();
