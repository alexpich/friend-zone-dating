import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/profile/edit/details";

class UserDetailsService {
  get(id) {
    return axios.get(API_URL + id);
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

}

export default new UserDetailsService();
