import axios from "axios";
import { BASE_ENDPOINTS } from "../../constants/api";
import api from "../api";

export function signInRequest(data, baseUrl) {
  api.defaults.auth = { username: data.user, password: data.password };
  api.defaults.baseURL = baseUrl;
  api.defaults.timeout = 10000;
  return api.get(BASE_ENDPOINTS.LOGIN);
}
