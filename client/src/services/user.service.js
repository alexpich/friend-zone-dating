import axios from "axios";
import authHeader from "./auth-header";

//test
const API_URL = "http://localhost:5000/api/user/";

class UserService {
  getTwentyUsersNearby(id) {
    return axios.get(API_URL + "twenty/" + id);
  }

  getOne(id) {
    return axios.get(API_URL + id);
  }

  getMatches(id) {
    return axios.get(API_URL + "matches/" + id);
  }

  update(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }
}

export default new UserService();
