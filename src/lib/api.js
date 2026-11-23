import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


export async function fetchWithAuth(endpoint, options = {}) {
  const { data } = await authClient.token();
  const token = data?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }
  return result;
}


export async function uploadImageToImgBB(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return (
    data.url ||
    "https://pexels.com"
  );
}
