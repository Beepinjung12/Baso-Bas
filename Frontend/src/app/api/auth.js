import config from "../config";
import axios from "axios";

export async function login({ phone, password }) {
  return await axios.post(
    `${config.apiUrl}/api/auth/login`,
    { phone, password },
    { withCredentials: true }
  );
}

export async function signup(data) {
  return await axios.post(
    `${config.apiUrl}/api/auth/register`,
    data,
    { withCredentials: true }
  );
}

export async function getUserProfile() {
  return await axios.get(
    `${config.apiUrl}/api/auth/profile`,
    { withCredentials: true }
  );
}

export async function updateUserProfile(data) {
  return await axios.put(
    `${config.apiUrl}/api/auth/profile/update`,
    data,
    {
      withCredentials: true,
      headers:
        data instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : {},
    }
  );
}

export async function logout() {
  return await axios.post(
    `${config.apiUrl}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
}

export async function deleteProfileImage() {
  return await axios.delete(
    `${config.apiUrl}/api/auth/profile/image`,
    {
      withCredentials: true,
    }
  );
}

// Request owner access
export async function requestOwnerAccess() {
  return await axios.post(
    `${config.apiUrl}/api/auth/request-owner`,
    {},
    { withCredentials: true }
  );
}

// Get all pending owner requests (Admin)
export async function getOwnerRequests() {
  return await axios.get(
    `${config.apiUrl}/api/auth/owner-requests`,
    { withCredentials: true }
  );
}

// Approve owner request (Admin)
export async function approveOwnerRequest(userId) {
  return await axios.put(
    `${config.apiUrl}/api/auth/owner-requests/${userId}/approve`,
    {},
    { withCredentials: true }
  );
}

// Reject owner request (Admin)
export async function rejectOwnerRequest(userId) {
  return await axios.put(
    `${config.apiUrl}/api/auth/owner-requests/${userId}/reject`,
    {},
    { withCredentials: true }
  );
}

export async function demoteOwner(userId) {
  return await axios.put(
    `${config.apiUrl}/api/auth/owner-requests/${userId}/demote`,
    {},
    { withCredentials: true }
  );
}