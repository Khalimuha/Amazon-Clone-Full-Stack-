import axios from "axios";
const axiosInstance = axios.create({
  // local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-23c81/us-central1/api"

  // deployed version of amanzon server on render.com
  baseURL: "https://amazon-api-deploy-i5uj.onrender.com/"
});

export { axiosInstance };
