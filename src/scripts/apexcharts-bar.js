import ApexCharts from 'apexcharts/dist/apexcharts.min.js'
export function load(weekSessionsData) {

    var options = {
      series: [{
        name: "Minutes Online",
        data: Object.values(weekSessionsData)
      }],
      chart: {
        type: 'bar',
        height: 320
      },
      plotOptions: {
        bar: {
          borderRadius: 3,
          horizontal: true,
        }
      },
      colors: ["#00a6de"],
      grid: {
        borderColor: '#f2f5f7',
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: Object.keys(weekSessionsData),
        labels: {
          show: true,
          style: {
            colors: "#00a6de",
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#00a6de",
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
          },
        }
      }
    };
    var chart = new ApexCharts(document.querySelector("#bar-basic"), options);
    chart.render();
  }