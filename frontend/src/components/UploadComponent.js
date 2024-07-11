import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 上传文件
      const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 分类图片
      const classifyResponse = await axios.post('http://localhost:5001/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 更新分类结果
      setMessage(`File uploaded successfully: ${uploadResponse.data.filename}`);
      setCategory(`Category: ${classifyResponse.data.category}`);

      // 保存分类结果到数据库
      await axios.post('http://localhost:5000/update-category', {
        filename: uploadResponse.data.filename,
        category: classifyResponse.data.category
      });

    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Clothing Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
      <p>{category}</p>
    </div>
  );
};

export default UploadComponent;
