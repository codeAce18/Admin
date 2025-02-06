import React, { useEffect } from 'react';

const ConfirmBlockModal = ({ isBlock, user, showModal, setShowModal, block }) => {

    // Show the modal using native JavaScript methods (simulating a click event)
    const showModalFunc = () => {
        const modalElement = document.getElementById('modalTriggerButton');
        modalElement && modalElement.click();  // Simulate a click to open the modal
    };

    // Hide the modal by triggering the close button
    const hideModalFunc = () => {
        const closeButton = document.getElementById('modalCloseButton');
        closeButton && closeButton.click();  // Simulate a click on the close button
    };

    // Control modal based on `showModal` prop
    useEffect(() => {
        if (showModal) {
            showModalFunc();
        } else {
            hideModalFunc();
        }
    }, [showModal]);

    return (
        <div>
            {/* Hidden trigger button to open the modal programmatically */}
            <button type="button" id="modalTriggerButton" className="d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content m-bg-secondary">
                        <div className="modal-header">
                            <h6 className="modal-title" id="staticBackdropLabel">Block User</h6>
                            <button type="button" className="btn-close" id="modalCloseButton" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to {isBlock === true ? 'block' : 'unblock'} user {user?.username || ''}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => { setShowModal(false); block(user); }} className={isBlock === true ? "btn btn-danger" : "btn btn-success"}>
                                {isBlock === true ? 'Block' : 'Unblock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBlockModal;
