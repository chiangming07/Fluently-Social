import axios from "axios";

const api = {
  hostname:
    process.env.REACT_APP_NODE_ENV === "production"
      ? "https://api.fluently.social/api/1.0"
      : "http://localhost:8080/api/1.0",

  async signup(data) {
    const response = await axios.post(`${this.hostname}/user/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async login(data) {
    const response = await axios.post(`${this.hostname}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async getProfile(accessToken) {
    const response = await axios.get(`${this.hostname}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    return response;
  },
  async updatePreference(data, accessToken) {
    const response = await axios.post(
      `${this.hostname}/user/update-preference`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  },

  async getChatroomList(userId, accessToken) {
    const response = await axios.get(
      `${this.hostname}/chat/chatroom-list/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response;
  },
};

export default api;
