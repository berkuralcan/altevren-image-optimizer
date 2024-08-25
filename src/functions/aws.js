import axios from 'axios';

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT; // EC2 public IP or domain

export const uploadFile = async (file, name, desiredWidth) => {
  console.log(API_ENDPOINT);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('desiredWidth', desiredWidth);

  try {
    const response = await axios.post(`${API_ENDPOINT}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed with:', error);
  }
}