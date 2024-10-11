import React, { useState } from 'react';

function PDFSummary({ isCollapsed, onToggleCollapse }) {
  const [userInput, setUserInput] = useState('');
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    setNotes([...notes, { title: 'New note', content: '' }]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  };

  return (
    <div className={`pdf-summary ${isCollapsed ? 'collapsed' : 'not-collapsed'}`}>
      <div className="summary-header">
        <h2 className="summary-title">Double Deep Q Learning</h2>
        <button className="settings-button">Settings</button>
        <button className="share-button">Share</button>
        <button className="collapse-button" onClick={onToggleCollapse}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={isCollapsed ? "M6 4L10 8L6 12" : "M10 4L6 8L10 12"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="summary-content">
        <div className="sources-section">
          <h3>Sources</h3>
          <button className="add-source-button">+</button>
          <label>
            <input type="checkbox" checked={true} onChange={() => {}} />
            Select all sources
          </label>
          <ul className="source-list">
            <li>1509.06461v3.pdf</li>
            <li>1708.05924v4.pdf</li>
            <li>1804.05685v2.pdf</li>
            <li>Gamagedara et al. 2020.pdf</li>
            <li>roger2003.pdf</li>
          </ul>
        </div>
        <button className="add-note-button" onClick={handleAddNote}>Add note</button>
        <button className="select-all-button">Select all</button>
        <div className="notes-section">
          {notes.map((note, index) => (
            <div key={index} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Explain the problem of value overestimation in Q-learning and how it can affect performance."
          />
          <button type="submit" className="submit-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 14L14 8L2 2V6L10 8L2 10V14Z" fill="currentColor"/>
            </svg>
          </button>
        </form>
        <div className="footer">
          <button className="view-chat-button">View Chat</button>
          <span className="sources-count">5 sources</span>
          <button className="notebook-guide-button">Notebook guide</button>
        </div>
        <p className="disclaimer">NotebookLM may still sometimes give inaccurate responses, so you may want to confirm any facts independently.</p>
      </div>
    </div>
  );
}

export default PDFSummary;