// src/api.ts

// Function to start a new session with the backend
export async function startSession() {
  try {
    const response = await fetch("http://localhost:5000/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to start session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error starting session:", error);
    throw error;
  }
}

// Function to send recorded audio to the backend
export async function sendAudio(audioBlob: Blob) {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    const response = await fetch("http://localhost:5000/audio", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send audio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending audio:", error);
    throw error;
  }
}


// import axios from "axios";

// // Create Axios instance
// const api = axios.create({
//   baseURL: "http://localhost:8080", // ✅ backend base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🎤 Function to upload audio
// export const uploadAudio = async (audioBlob: Blob) => {
//   try {
//     const formData = new FormData();
//     formData.append("audio", audioBlob, "recording.wav");

//     const response = await api.post("/api/voice", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       console.error("Response error:", error.response.status, error.response.data);
//     } else if (error.request) {
//       console.error("Request error: No response received", error.request);
//     } else {
//       console.error("Axios error:", error.message);
//     }
//     throw error;
//   }
// };

// export default api;
