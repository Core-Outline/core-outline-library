import React, { useState, useEffect } from 'react';
import { s3 } from './aws-config';
import PDFViewer from './PDFViewer';
import favicon from './images/favicon.ico';
import './App.css';
import PDFSummary from './PDFSummary';
import menuBars from './images/menu-bar.png'

function App() {
  const [files, setFiles] = useState([]);
  const [topic, setTopic] = useState('');
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folderFiles, setFolderFiles] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const params = {
      Bucket: 'core-library',
      Delimiter: '/'
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const folderList = data.CommonPrefixes.map(prefix => prefix.Prefix.slice(0, -1));
        setFolders(folderList);
      }
    });
  };

  const fetchFolderFiles = async (folder) => {
    const params = {
      Bucket: 'core-library',
      Prefix: folder + '/'
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const fileList = data.Contents.map(file => file.Key.split('/').pop()).filter(name => name);
        setFolderFiles(fileList);
      }
    });
  };

  const handleFolderSelect = (e) => {
    const folder = e.target.value;
    setSelectedFolder(folder);
    if (folder) {
      fetchFolderFiles(folder);
    } else {
      setFolderFiles([]);
    }
  };

  const handleFileSelect = (fileName) => {
    const params = {
      Bucket: 'core-library',
      Key: `${selectedFolder}/${fileName}`,
    };

    const url = s3.getSignedUrl('getObject', params);
    setSelectedFileUrl(url);
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
          fetchFolders();
        }
      });
    });
  };

  const onToggleCollapse = () => {
    setIsSummaryCollapsed(!isSummaryCollapsed);
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        
        <img src={favicon} alt="Core&Outline Library Logo" className="logo" />
        <h1>Core&Outline Library</h1>
        <input 
          type="text" 
          placeholder="Enter Topic" 
          value={topic} 
          onChange={handleTopicChange} 
          className="input-field"
        />
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange} 
          className="file-input"
          label='Browse Documents'          
        />
        <button onClick={uploadFiles} className="upload-button">
          Upload
        </button>
  
        <h2>Topic</h2>
        <select 
          value={selectedFolder} 
          onChange={handleFolderSelect}
          className="folder-select"
        >
          <option value="">Topic</option>
          {folders.map((folder, index) => (
            <option key={index} value={folder}>
              {folder}
            </option>
          ))}
        </select>

        {selectedFolder && (
          <>
            <h3>Papers about {selectedFolder}</h3>
            <ul className="file-list">
              {folderFiles.map((file, index) => (
                <li key={index}>
                  <button onClick={() => handleFileSelect(file)} className="file-button">
                    {file}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      <img onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="collapse-button" background={menuBars} src={menuBars}>
            {/* {isSidebarCollapsed ? 'Expand' : 'Collapse'} */}
        </img>
      <div className={`main-content ${isSummaryCollapsed ? 'extended' : ''}`}>
        {selectedFileUrl && <PDFViewer fileUrl={selectedFileUrl} />}
      </div>
      <PDFSummary 
        fileUrl={selectedFileUrl} 
        isCollapsed={isSummaryCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
    </div>
  );
}

export default App;