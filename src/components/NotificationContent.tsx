import React, { useEffect, useState } from 'react';
import Avatar from '../assets/images/pirate/user1.png';
import { viewNotifications } from '../scripts/fetch.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/index.tsx';
import { timeAgo } from '../scripts/utils.js';

const NotificationContent = ({ showFull, setVisible }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, activity, setActivity } = useAppContext();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set the number of notifications to show per page

    const load = async () => {
        const res = await viewNotifications(token);
        setActivity(res);
    }

    useEffect(() => {
        load();
    }, [location]);

    // Calculate the index of the first and last notification on the current page
    const indexOfLastNotification = currentPage * itemsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
    const currentNotifications = activity && Array.isArray(activity) ? activity.slice(indexOfFirstNotification, indexOfLastNotification) : [];

    // Calculate total pages
    const totalPages = Math.ceil((activity && Array.isArray(activity) ? activity.length : 0) / itemsPerPage);

    // Handle pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="table-responsive mt-3">
            {
                (activity && activity.length > 0) &&
                <table className="table text-nowrap table-borderless m-bg-secondary">
                    {
                        showFull ?? (
                            <thead>
                                <tr>
                                    <th className='p-3' scope="col"></th>
                                    <th className='p-3' scope="col">Username</th>
                                    <th className='p-3' scope="col">Description</th>
                                    <th className='p-3' scope="col">Action</th>
                                    <th className='p-3' scope="col">Date</th>
                                </tr>
                            </thead>
                        )
                    }

                    <tbody>
                        {
                            currentNotifications.map((player, index) =>
                                <tr key={index}>
                                    <th className={showFull ? '' : 'd-none'} scope="row">
                                        <div className='d-flex justify-content-center w-100'>
                                            <span className="avatar avatar-md avatar-rounded me-2 offline">
                                                <img src={player.level_image_url ? `${process.env.REACT_APP_API_URL}${player.level_image_url}` : Avatar} alt="img" />
                                            </span>
                                        </div>
                                    </th>
                                    <td>{player.username ?? ""}</td>
                                    <td>
                                        {player.description ?? ""}
                                    </td>
                                    <td>
                                        <span className={player.action === "online" ? "badge bg-outline-success" : player.action === "offline" ? "badge bg-outline-danger" : "badge bg-outline-info"}>
                                            {player.action ?? "action"}
                                        </span>
                                    </td>
                                    <td>{player.created_at ? timeAgo(player.created_at) : ""}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }

            {
                showFull ? (
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-secondary text-primary" onClick={()=>{navigate('/notifications'); setVisible(false)}}>View All</button>
                    </div>
                )
            }
            {/* Pagination Controls */}

        </div>
    );
}

export default NotificationContent;
