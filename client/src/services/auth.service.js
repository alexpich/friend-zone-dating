import axios from "axios";
// import authHeader from "./auth-header";

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

  signup(email, firstName, lastName, password, birthdate, latitude, longitude) {
    return axios.post(API_URL + "signup", {
      email,
      firstName,
      lastName,
      password,
      birthdate,
      latitude,
      longitude,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
