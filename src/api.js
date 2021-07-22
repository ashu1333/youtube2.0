import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyDcj1oNQ8hkEzlztV2H3rv0IkjLsdhqKL8",
  },
});

export default request;
