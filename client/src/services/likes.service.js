import axios from "axios";
import authHeader from "./auth-header";

//test
const API_URL = "http://localhost:5000/api/friendzone/";

class LikesService {
  // TODO: Fix these
  // getAll() {
  //   return axios.get(API_URL);
  // }

  create(data) {
    return axios.post(API_URL, data);
  }
}

export default new LikesService();
