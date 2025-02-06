import React, { useEffect } from 'react'
import { load } from '../../scripts/apexcharts-bar';

export const BarChart = ({ props }) => {
  const { weekSessionsData } = props;
  useEffect(() => {
    if (weekSessionsData) {
      if (Object.keys(weekSessionsData).length > 0) {
        load(weekSessionsData);
      }
    }

  }, [weekSessionsData]);
  return (
    <div className="col-xl-6">
      <div className="card custom-card m-bg-secondary">
        <div className="card-header">
          <div className="card-title">WEEKLY PLAYERS SESSION</div>
        </div>
        <div className="card-body ff-secondary">
          <div id="bar-basic"></div>
        </div>
      </div>
    </div>
  )
}
