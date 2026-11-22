import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ব্যাকএন্ডে JWT টোকেনসহ রিকোয়েস্ট পাঠানোর ফাংশন
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

// প্রফেশনাল উপায়ে নিজের সার্ভার রুটের (/api/upload) মাধ্যমে ছবি আপলোড করার ফাংশন
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



// import { authClient } from "./auth-client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // ব্যাকএন্ডে JWT টোকেনসহ রিকোয়েস্ট পাঠানোর ফাংশন
// export async function fetchWithAuth(endpoint, options = {}) {
//   const { data } = await authClient.token();
//   const token = data?.token;

//   const headers = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || "Something went wrong");
//   }
//   return result;
// }

// // নিজের সার্ভার রুটের (/api/upload) মাধ্যমে ছবি আপলোড করার ফাংশন
// export async function uploadImageToImgBB(imageFile) {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   const response = await fetch("/api/upload", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await response.json();
//   if (!response.ok || !data.url) {
//     throw new Error(data.message || "Failed to upload image to ImgBB.");
//   }

//   return data.url;
// }

// import { authClient } from "./auth-client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// const IMGBB_API_KEY =
//   process.env.NEXT_PUBLIC_IMGBB_API_KEY || "6fcb32a6cf26b2fc28e74a61db315a5c";

// export async function fetchWithAuth(endpoint, options = {}) {
//   const { data } = await authClient.token();
//   const token = data?.token;

//   const headers = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || "Something went wrong");
//   }
//   return result;
// }

// export async function uploadImageToImgBB(imageFile) {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   const response = await fetch(`https://imgbb.com{IMGBB_API_KEY}`, {
//     method: "POST",
//     body: formData,
//   });

//   const result = await response.json();

//   if (!response.ok || !result.success) {
//     throw new Error(
//       result.error?.message || "Failed to upload image to ImgBB.",
//     );
//   }

//   return result.data.display_url || result.data.url;
// }

// export async function uploadImageToImgBB(imageFile) {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   const response = await fetch("/api/upload", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await response.json();
//   if (!response.ok || !data.url) {
//     throw new Error(data.message || "Failed to upload image.");
//   }

//   return data.url;
// }



// import { authClient } from "./auth-client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // ১. ব্যাকএন্ডে JWT টোকেনসহ রিকোয়েস্ট পাঠানোর ফাংশন
// export async function fetchWithAuth(endpoint, options = {}) {
//   const { data } = await authClient.token();
//   const token = data?.token;

//   const headers = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || "Something went wrong");
//   }
//   return result;
// }

// // ২. সার্ভার রুটের (/api/upload) মাধ্যমে ছবি আপলোড করার ফাংশন
// export async function uploadImageToImgBB(imageFile) {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   const response = await fetch("/api/upload", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await response.json();
//   if (!response.ok || !data.url) {
//     throw new Error(data.message || "Failed to upload image.");
//   }

//   return data.url;
// }



