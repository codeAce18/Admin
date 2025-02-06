import React, { useEffect } from 'react';
import { load } from '../../scripts/apexcharts-line.js';





const LineChart = ({ props }) => {
    const { dailyActiveUsersData } = props;
    useEffect(() => {


        if (dailyActiveUsersData) {
            if (dailyActiveUsersData.length > 0) {
                load(dailyActiveUsersData);
            }
        }

    }, [dailyActiveUsersData]);
    return (



        <div className="col-xl-6">
            <div className="card custom-card m-bg-secondary">
                <div className="card-header">
                    <div className="card-title">ACTIVE PLAYERS</div>
                </div>
                <div className="card-body ff-secondary">
                    <div id="line-chart" ></div>
                </div>
            </div>
        </div>



    )
}

export default LineChart