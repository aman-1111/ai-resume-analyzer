import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const generateATSResume = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/generate-ats-resume`,
      data
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};