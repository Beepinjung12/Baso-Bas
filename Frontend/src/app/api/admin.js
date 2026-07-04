import config from "../config";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export async function getAdminStats() {
  return api.get("/api/admin/stats");
}

export async function getAllUsers() {
  return api.get("/api/admin/users");
}

export async function deleteUser(id) {
  return api.delete(`/api/admin/users/${id}`);
}
