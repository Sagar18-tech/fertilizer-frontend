import axios from "axios";

const API_URL = "http://localhost:5000/api/recommendations"; // replace with your backend URL

export const getFertilizerRecommendation = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching fertilizer recommendation:", error);
    throw error;
  }
};
