import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  signin(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  signout() {
    localStorage.removeItem("user");
  }

  signup(email, firstName, lastName, password) {
    return axios.post(API_URL + "signup", {
      email,
      firstName,
      lastName,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
