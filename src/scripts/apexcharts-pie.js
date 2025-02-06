import ApexCharts from 'apexcharts/dist/apexcharts.min.js'
export function load(percentPerlevel) {
    const percentList = [];
    const levelList = [];

    percentPerlevel.map((level) => {
        levelList.push("Level " + level.level);
        percentList.push(level.percentage);
        return null;
    });
    var options = {
        series: percentList,
        chart: {
            height: 300,
            type: "pie",
        },
        colors: ["#735dff", "#ff5a29", "rgb(12, 199, 99)", "#0ca3e7", "rgb(255, 154, 19)"],
        labels: levelList,
        legend: {
            position: "bottom",
            markers: {
                size: 4,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#pie-basic"), options);
    chart.render();
}