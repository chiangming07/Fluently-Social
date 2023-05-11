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
  async getRoomId(data) {
    const response = await axios.post(`${this.hostname}/chat/room-id`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async getChatHistory(roomId, paging) {
    const response = await axios.get(
      `${this.hostname}/chat/history?roomId=${roomId}&paging=${paging}`
    );
    return response;
  },
  async sendAbstract(data) {
    const response = await axios.post(`${this.hostname}/chat/abstract`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async searchHistory(roomId, search) {
    const response = await axios.get(
      `${this.hostname}/chat/search-history?roomId=${roomId}&keyword=${search}`
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
  async getPresignedURL(accessToken) {
    const response = await axios.get(`${this.hostname}/chat/upload-s3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    return response;
  },
  async uploadToS3(url, data) {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  async matchPartner(data) {
    const response = await axios.post(
      `${this.hostname}/chat/anonymous/match`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    return response;
  },
  async clearMatch() {
    const response = await axios.delete(
      `${this.hostname}/chat/anonymous/clearMatch`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    return response;
  },
  async fetchAllUsers(data) {
    const response = await axios.post(`${this.hostname}/community/all`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async fetchNearbyUsers(data) {
    const response = await axios.post(
      `${this.hostname}/community/nearme`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  async updateAvatar(data, accessToken) {
    const response = await axios.patch(
      `${this.hostname}/user/update-avatar`,
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
};

export default api;
