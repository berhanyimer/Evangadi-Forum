import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:2200/api", //back end url
  baseURL: "https://backendforum.lidiaafework.com/api", //back end url
});
export default axiosBase;
