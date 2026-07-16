import axios from "axios";
import config from "@/app/config";

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

// =======================
// Add To Wishlist
// =======================
export async function addToWishlist(roomId) {
  return api.post(`/api/wishlist/${roomId}`);
}

// =======================
// Remove From Wishlist
// =======================
export async function removeFromWishlist(roomId) {
  return api.delete(`/api/wishlist/${roomId}`);
}

// =======================
// Get My Wishlist
// =======================
export async function getMyWishlist() {
  return api.get("/api/wishlist");
}

// =======================
// Check Wishlist Status
// =======================
export async function checkWishlist(roomId) {
  return api.get(`/api/wishlist/check/${roomId}`);
}