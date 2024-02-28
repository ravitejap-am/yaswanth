import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const CircularFileInput = ({ initialImageUrl, apiUrl, onChange }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const selectedImageUrl = URL.createObjectURL(selectedFile);
    setImageUrl(selectedImageUrl);
    onChange(selectedFile);
  };

  return (
    <label htmlFor="file-input" style={{ display: 'block', cursor: 'pointer' }}>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid #d9d9d9',
          position: 'relative',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              color: '#d9d9d9',
            }}
          >
            <PlusOutlined style={{ fontSize: '24px' }} />
          </div>
        )}
      </div>
    </label>
  );
};

export default CircularFileInput;
