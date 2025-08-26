import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🎤 Function to upload audio
export const uploadAudio = async (audioBlob: Blob) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    const response = await api.post("/api/voice", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Response error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Request error: No response received", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    throw error;
  }
};

export default api;
