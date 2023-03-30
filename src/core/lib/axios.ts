import { API_URL } from "@/config";
import Axios from "axios";

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use((response) => response.data);

export default axios;
