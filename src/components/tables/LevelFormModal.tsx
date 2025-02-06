import React, { useEffect, useState, useRef } from 'react';
import { uploadImage } from '../../scripts/fetch.ts';
import { useAppContext } from '../../context/index.tsx';

// Columns for level form fields
const columns = [
    { name: 'level', label: 'Level', type: 'text' },
    { name: 'level_name', label: 'Level Name', type: 'text' },
    { name: 'level_reward', label: 'Level Up Reward', type: 'price' },
    { name: 'level_threshold', label: 'Level Threshold', type: 'text' },
    { name: 'taprate_reward', label: 'Taprate Reward', type: 'text' },
    { name: 'energy_reward', label: 'Energy Capacity', type: 'text' },
    { name: 'taprate_price', label: 'Taprate Price', type: 'number' },
    { name: 'taprate_price_reward', label: 'Purchase Reward', type: 'number' },
    { name: 'taprate_duration', label: 'Taprate Duration', type: 'text' },
];

// LevelFormModal Component
const LevelFormModal = ({ props }) => {
    const { isEditing, levelEditing, showModal, setShowModal, onAddLevel, onEditLevel } = props;
    const { token } = useAppContext();
    const [formData, setFormData] = useState({
        level_image_url: '',
        level: '',
        level_name: '',
        level_threshold: '',
        level_reward: '', 
        taprate_reward: '',
        energy_reward: '',
        taprate_price: 0,
        taprate_price_reward: 0,
        taprate_duration: '',
    });
    const modalRef = useRef(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image file upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImage(file, token); // Use uploadImage function
            setFormData({ ...formData, level_image_url: imageUrl.image_url });
        }
    };

    // Prepopulate form when editing
    useEffect(() => {
        if (isEditing && levelEditing) {
            setFormData({ ...levelEditing });
        } else {
            // Reset form when adding new level
            setFormData({
                level_image_url: '',
                level: '',
                level_name: '',
                level_reward: '', 
                level_threshold: '',
                taprate_reward: '',
                energy_reward: '',
                taprate_price: 0,
                taprate_price_reward: 0,
                taprate_duration: '',
            });
        }
    }, [isEditing, levelEditing]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onEditLevel(formData);  // Edit existing level
        } else {
            onAddLevel(formData);   // Add new level
        }
        setShowModal(false); // Close modal after submission
    };
    // Function to show the modal programmatically
    const showModalFunc = () => {
        const modalElement = document.getElementById('modalTriggerButton3');
        modalElement && modalElement.click();  // Simulate a click to open the modal
    };

    // Function to hide the modal programmatically
    const hideModalFunc = () => {
        const closeButton = document.getElementById('modalCloseButton3');
        closeButton && closeButton.click();  // Simulate a click on the close button
    };

    // Close modal when form is submitted or cancelled
    useEffect(() => {
        if (!showModal) {
            hideModalFunc();
        } else {
            showModalFunc();
        }
    }, [showModal]);
    return (
        <div>
            <button type="button" id="modalTriggerButton3" className="d-none" data-bs-toggle="modal" data-bs-target="#levelModal"></button>
            <div className="modal fade" id="levelModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                aria-labelledby="levelModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content m-bg-secondary">
                        <div className="modal-header">
                            <h5 className="modal-title" id="levelModalLabel">{isEditing ? 'Edit Level' : 'Add New Level'}</h5>
                            <button type="button" onClick={() => setShowModal(false)} className="btn-close btn-close-white" id='modalCloseButton3' data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/* Image Upload Field */}
                                <div className="mb-3">
                                    <label htmlFor="level_image_url" className="form-label">Level Image</label>
                                    <input
                                        type="file"
                                        id="level_image_url"
                                        name="level_image_url"
                                        onChange={handleImageUpload}
                                        className="form-control text-secondary"
                                    />
                                    {/* {formData.level_image_url && (
                                        <img src={formData.level_image_url} alt="Level" className="mt-2 img-fluid" />
                                    )} */
                                        formData.level_image_url ? formData.level_image_url : 'waiting...'}
                                </div>
                                
                                {/* Other form fields */}
                                {columns.map((col) => (
                                    <div key={col.name} className="mb-3">
                                        <label htmlFor={col.name} className="form-label">{col.label}</label>
                                        <input
                                            type={col.type}
                                            id={col.name}
                                            name={col.name}
                                            value={formData[col.name]}
                                            onChange={handleChange}
                                            className="form-control text-secondary"
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Level'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelFormModal;
