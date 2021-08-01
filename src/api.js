import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyBJyf0S3LmIcnqTRwb6M88Ie9N4-Dwy9ew",
  },
});

export default request;
