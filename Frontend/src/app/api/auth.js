import config from "../config";
import axios from "axios";

export async function login({ phone, password }) {
  return await axios.post(`${config.apiUrl}/api/auth/login`, {
    phone,
    password,
  });
}

export async function signup(data) {
  return await axios.post(`${config.apiUrl}/api/auth/register`, data);
}
