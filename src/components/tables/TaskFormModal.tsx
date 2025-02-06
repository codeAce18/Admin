import React, { useEffect, useState, useRef } from 'react';



// TaskFormModal Component
const TaskFormModal = ({ props }) => {
    const { isEditing, taskEditing, showModal, setShowModal, onAddTask, onEditTask } = props;
    const columns = [

        { name: 'task_name', label: 'Task Name', type: 'text' },
        { name: 'task_reward', label: 'Reward', type: 'price' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'task_url', label: 'Task url', type: 'url' },

    ]
    const [formData, setFormData] = useState({
        task_id: '',
        task_name: '',
        description: '',
        task_url: '',
        completion_count: 0,
    });
    const modalRef = useRef(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Prepopulate form when editing
    useEffect(() => {
        if (isEditing && taskEditing) {
            setFormData({ ...taskEditing });
        } else {
            // Reset form when adding new task
            setFormData({
                task_id: '',
                task_name: '',
                description: '',
                task_url: '',
                completion_count: 0,
            });
        }
    }, [isEditing, taskEditing]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onEditTask(formData);  // Edit existing task
        } else {
            onAddTask(formData);   // Add new task
        }
        setShowModal(false);
    };

    // Function to show the modal programmatically
    const showModalFunc = () => {
        const modalElement = document.getElementById('modalTriggerButton');
        modalElement && modalElement.click();  // Simulate a click to open the modal
    };

    // Function to hide the modal programmatically
    const hideModalFunc = () => {
        const closeButton = document.getElementById('modalCloseButton');
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
            <button type="button" id="modalTriggerButton" className="d-none" data-bs-toggle="modal" data-bs-target="#taskModal"></button>
            <div className="modal fade" id="taskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                aria-labelledby="taskModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content m-bg-secondary">
                        <div className="modal-header">
                            <h5 className="modal-title" id="taskModalLabel">{isEditing ? 'Edit Task' : 'Add New Task'}</h5>
                            <button type="button" onClick={() => setShowModal(false)} className="btn-close btn-close-white" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {columns.map((col) => (
                                    <div key={col.name} className="mb-3">
                                        <label htmlFor={col.name} className="form-label fs-14 text-white">{col.label}</label>

                                        {
                                            col.name === 'level_image_url' ? (<>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id={col.name} name={col.name} onChange={handleChange} />
                                                    <label className="custom-file-label" htmlFor={col.name}>Choose image</label>
                                                </div>
                                            </>) : (
                                                <input
                                                    type={col.type}
                                                    id={col.name}
                                                    name={col.name}
                                                    value={formData[col.name]}
                                                    onChange={handleChange}
                                                    className="form-control text-secondary"
                                                    required={col.name !== 'task_id'}
                                                />
                                            )
                                        }
                                    </div>
                                ))}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Task'}</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskFormModal;
