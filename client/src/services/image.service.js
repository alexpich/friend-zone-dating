import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/profile/edit/";

class ImageService {
  //   getAll() {
  //     return axios.get(API_URL);
  //   }

  get(id) {
    return axios.get(API_URL + id);
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  //   update(id, data) {
  //     return axios.put(`/users/${id}`, data);
  //   }

  //   delete(id) {
  //     return axios.delete(`/users/${id}`);
  //   }
}

export default new ImageService();
