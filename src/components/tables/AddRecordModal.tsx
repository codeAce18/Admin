import React, { useState, useEffect } from 'react';

// Modal component for adding new records
const AddRecordModal = ({ isOpen, onClose, onAdd }) => {
  const [newRecord, setNewRecord] = useState({});

  const handleInputChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onAdd(newRecord);
    setNewRecord({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Record</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="text" name="name" placeholder="Enter name" onChange={handleInputChange} />
            {/* Add more fields as needed */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;
