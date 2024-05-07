import React, { useState, useEffect } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons' // Import the delete icon
import { PLACEHODER_IMAGE } from '../../../constants/Constant'

const CircularFileInput = ({ initialImageUrl, apiUrl, onChange }) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (initialImageUrl) {
            setImageUrl(initialImageUrl)
        }
    }, [initialImageUrl])

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        const selectedImageUrl = URL.createObjectURL(selectedFile)
        setImageUrl(selectedImageUrl)
        onChange(selectedFile)
    }

    const handleDelete = () => {
        setImageUrl('') // Clear the image URL
        onChange(null) // Clear the file selection
    }

    console.log('imageUrl---->', imageUrl)

    return (
        <div>
            <input
                type="file"
                id="file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label
                htmlFor="file-input"
                style={{ display: 'block', cursor: 'pointer' }}
            >
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
            {imageUrl !== PLACEHODER_IMAGE && ( // Render delete button only if imageUrl is present
                <div // Delete icon container
                    style={{
                        marginTop: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <DeleteOutlined
                        style={{
                            fontSize: '16px',
                            color: 'red',
                            cursor: 'pointer',
                        }}
                        onClick={handleDelete}
                    />
                </div>
            )}
        </div>
    )
}

export default CircularFileInput
