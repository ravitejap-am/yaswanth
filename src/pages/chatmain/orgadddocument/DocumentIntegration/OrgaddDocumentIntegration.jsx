import React from 'react';
import axios from 'axios';

const OrgaddDocumentIntegration = ({ onUploadSuccess, onUploadError }) => {
  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append('document', e.target.files[0]);

      const response = await axios.post('http://54.161.113.196:8080/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response through the callback
      if (response.status === 200) {
        onUploadSuccess(response.data);
      } else {
        onUploadError('Failed to upload document');
      }
    } catch (error) {
      // Handle errors through the callback
      onUploadError(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
      />
    </div>
  );
};

export default OrgaddDocumentIntegration;
