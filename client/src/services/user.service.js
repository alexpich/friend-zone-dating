import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

//test
const API_URL = "http://localhost:5000/api/user/";

class UserService {
  // TODO: Fix these
  // getAll() {
  //   return axios.get(API_URL);
  // }

  getTwentyUsers() {
    return axios.get(API_URL + "twenty");
  }

  getOne(id) {
    return axios.get(API_URL + id);
  }

  update(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }

  // delete(id) {
  //   return axios.delete(`/users/${id}`);
  // }

  // findByEmail(email) {
  //   return axios.get(`/users?email=${email}`);
  // }

  // findByFirstName(firstName) {
  //   return axios.get(`/users?firstName=${firstName}`);
  // }

  // findByLastName(lastName) {
  //   return axios.get(`/users?lastName=${lastName}`);
  // }
}

export default new UserService();
