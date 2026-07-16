import config from "../config";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

function buildRoomFormData(
  data,
  imageFiles = [],
  existingImages = []
) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  // Keep existing images
  formData.append(
    "existingImages",
    JSON.stringify(existingImages)
  );

  // Add new uploaded images
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  return formData;
}

export async function getRooms() {
  return api.get("/api/rooms");
}

export async function createRoom(data, imageFiles = []) {
  if (imageFiles.length > 0) {
    const formData = buildRoomFormData(data, imageFiles, []);

    return api.post("/api/rooms", formData);
  }

  return api.post("/api/rooms", data);
}

export async function updateRoom(
  id,
  data,
  imageFiles = [],
  existingImages = []
) {
  const formData = buildRoomFormData(
    data,
    imageFiles,
    existingImages
  );

  return api.put(
    `/api/rooms/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function deleteRoom(id) {
  return api.delete(`/api/rooms/${id}`);
}

export async function searchRooms(keyword) {
  return api.get("/api/rooms/search", {
    params: {
      keyword,
    },
  });
}