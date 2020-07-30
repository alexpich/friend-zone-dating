import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/profile/edit/details/";

class UserDetailsService {
  get(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }
}

export default new UserDetailsService();
