import React from 'react'
import Friend from '../../assets/images/pirate/add-friend.png'
import Daily from '../../assets/images/pirate/day_hours.png'

const Dashboardkpi = ({ playersCount, activePlayersCount, dailyPlayerCount, }) => {
    return (
        <div className="row justify-content-center ff-secondary">
            <div className="col-md-4">
                <div className="card custom-card main-card-item m-bg-secondary border-tetiary">
                    <div className="card-body cursor bg-hover-primary">
                        <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap">
                            <div>
                                <span className="d-block mb-3 fw-medium">Total Players</span>
                                <h3 className="fw-semibold lh-1 mb-0">{playersCount ?? 0}</h3>
                            </div>
                            <div className="text-end">
                                <div className="mb-4">
                                    <span className="avatar avatar-md bg-success svg-white avatar-rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="84" cy="108" r="52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card custom-card main-card-item primary m-bg-secondary border-tetiary">
                    <div className="card-body cursor bg-hover-primary">
                        <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap">
                            <div>
                                <span className="d-block mb-3 fw-medium">Daily Players</span>
                                <h3 className="fw-semibold lh-1 mb-0">{dailyPlayerCount ?? 0}</h3>
                            </div>
                            <div className="text-end">
                                <div className="mb-4">
                                    <span className="avatar avatar-md bg-primary svg-white avatar-rounded">
                                        <img src={Daily} alt='friend' className='w-50 h-50' />
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M168,88a40,40,0,0,1-80,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg> */}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card custom-card main-card-item m-bg-secondary border-tetiary">
                    <div className="card-body cursor bg-hover-primary">
                        <div className="d-flex align-items-start justify-content-between mb-3 flex-wrap">
                            <div>
                                <span className="d-block mb-3 fw-medium">Active Players</span>
                                <h3 className="fw-semibold lh-1 mb-0">{activePlayersCount ?? 0}</h3>
                            </div>
                            <div className="text-end">
                                <div className="mb-4">
                                    <span className="avatar avatar-md bg-danger svg-white avatar-rounded">
                                        <img src={Friend} alt='friend' className='w-50 h-50' />
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="24" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg> */}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            



        </div>
    )
}

export default Dashboardkpi