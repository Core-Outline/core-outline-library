// App.js
import React, { useState, useEffect } from 'react';
import { s3 } from './aws-config';
import PDFViewer from './PDFViewer';

function App() {
  const [files, setFiles] = useState([]);
  const [topic, setTopic] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  // Fetch the list of uploaded files from S3
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const params = {
      Bucket: 'core-library',
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else setUploadedFiles(data.Contents.map(file => file.Key));
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const uploadFiles = async () => {
    Array.from(files).forEach(file => {
      const params = {
        Bucket: 'core-library',
        Key: `${topic}/${file.name}`,
        Body: file,
        ContentType: 'application/pdf',
      };

      s3.upload(params, (err, data) => {
        if (err) console.log(err);
        else {
          console.log(`Successfully uploaded ${file.name}`);
          fetchFiles();  // Refresh the list of uploaded files
        }
      });
    });
  };

  const handleFileSelect = (fileKey) => {
    const params = {
      Bucket: 'core-library',
      Key: fileKey,
    };

    const url = s3.getSignedUrl('getObject', params);
    setSelectedFileUrl(url);
  };

  return (
    <div>
      <h1>PDF Manager</h1>
      <input type="text" placeholder="Enter Topic" value={topic} onChange={handleTopicChange} />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles}>Upload to S3</button>

      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a href="#" onClick={() => handleFileSelect(file)}>
              {file}
            </a>
          </li>
        ))}
      </ul>

      {selectedFileUrl && <PDFViewer fileUrl={selectedFileUrl} />}
    </div>
  );
}

export default App;
