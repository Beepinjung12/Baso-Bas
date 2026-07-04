import config from "../config";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export async function getRooms() {
  return api.get("/api/rooms");
}

export async function createRoom(data) {
  return api.post("/api/rooms", data);
}

export async function updateRoom(id, data) {
  return api.put(`/api/rooms/${id}`, data);
}

export async function deleteRoom(id) {
  return api.delete(`/api/rooms/${id}`);
}

export async function searchRooms(keyword) {
  return api.get("/api/rooms/search", { params: { keyword } });
}
