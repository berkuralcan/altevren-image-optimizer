const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT; // EC2 public IP or domain

export const uploadFile = async (file, name, desiredWidth) => {
  console.log('API Endpoint:', API_ENDPOINT);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('desired_width', desiredWidth);

  // Log the FormData contents
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/upload`, {
      method: 'POST',
      body: formData,
      // No need to set Content-Type header, it's automatically set with boundary
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Upload failed with:', error);
    throw error;
  }
}