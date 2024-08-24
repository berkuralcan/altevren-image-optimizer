import axios from 'axios';

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT; // EC2 public IP or domain

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_ENDPOINT}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}