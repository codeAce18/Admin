import React, { useEffect } from 'react';

const ConfirmDeleteModal = ({props}) => {
    const { item, showDeleteModal, setShowDeleteModal, callback } = props;
    // Show the modal using native JavaScript methods (simulating a click event)
    const showModalFunc = () => {
        const modalElement = document.getElementById('modalTriggerButton2');
        modalElement && modalElement.click();  // Simulate a click to open the modal
    };

    // Hide the modal by triggering the close button
    const hideModalFunc = () => {
        const closeButton = document.getElementById('modalCloseButton2');
        closeButton && closeButton.click();  // Simulate a click on the close button
    };

    // Control modal based on `showModal` prop
    useEffect(() => {
        if (showDeleteModal) {
            showModalFunc();
        } else {
            hideModalFunc();
        }
    }, [showDeleteModal]);

    return (
        <div>
            {/* Hidden trigger button to open the modal programmatically */}
            <button type="button" id="modalTriggerButton2" className="d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"></button>

            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static"
                data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content m-bg-secondary">
                        <div className="modal-header">
                            <h6 className="modal-title" id="staticBackdropLabel">Delete</h6>
                            <button type="button" className="btn-close" id="modalCloseButton2" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {item ? (item.task_name || item.level_id || ''):''}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => { setShowDeleteModal(false); callback(item); }} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
