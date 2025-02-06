import React, { useEffect } from 'react'; import { load } from '../../scripts/apexcharts-pie';
;

const PieChart = ({ props }) => {
  const { percentPerlevel } = props;
  useEffect(() => {
    if (percentPerlevel) {
      if (percentPerlevel.length > 0) {
        load(percentPerlevel);
      }

    }
  }, [percentPerlevel]);
  return (
    <div className="col-xl-12">
      <div className="card custom-card m-bg-secondary">
        <div className="card-header">
          <div className="card-title">PERCENT PLAYERS PER LEVEL</div>
        </div>
        <div className="card-body">
          <div id="pie-basic"></div>
        </div>
      </div>
    </div>
  )
}

export default PieChart