import React, { useState } from 'react'
import NotificationContent from './NotificationContent.tsx'

function Notificationwidget() {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <li className="header-element  dropdown">

                <span className="header-link text-hover-primary cursor" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="messageDropdown" aria-expanded={visible?"true":"false"}>

                    <i className="bi bi-bell fs-5 fw-bold header-link-icon animate-bell"></i>
                    {/* <span className="header-icon-pulse bg-secondary rounded pulse pulse-secondary"></span> */}
                </span>

                <div className="main-header-dropdown dropdown-menu dropdown-menu-end border-tetiary m-bg-secondary" style={{}}>
                    <div className="p-3" >
                        <div className="d-flex align-items-center justify-content-between" >
                            <p className="mb-0 fw-bold">NOTIFICATIONS</p>
                            
                        </div>
                    </div>
                    <hr className='text-primary' />
                    <NotificationContent setVisible={setVisible} showFull={false}/>
                   
                </div>

            </li></div>
    )
}

export default Notificationwidget