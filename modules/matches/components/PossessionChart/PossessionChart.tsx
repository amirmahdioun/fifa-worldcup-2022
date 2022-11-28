import dynamic from "next/dynamic";

const ApexCharts = dynamic(
    () => import('react-apexcharts'),
    {ssr: false}
)

type dataItem = {
    name: string,
    data: number[]
}

type Props = {
    chartData : dataItem[]
}


const Chart_option = {
    chart: {
        type: 'bar',
        height: 50,
        stacked: true,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            startingShape: "rounded",
            endingShape: "rounded",
            colors: {
                backgroundBarOpacity: 1,
                backgroundBarRadius: 8,
                borderRadiusOnAllStackedSeries: true

            }
        },
    },
    stroke: {
        colors: ['#fff'],
        border: 'none'
    },
    xaxis: {
        show: false,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
        tooltip: {
            enabled: false,
        }
    },
    yaxis: {
        max: 100,
        show: false,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    tooltip: {
        y: {
            formatter: function (val: string) {
                return val + "%"
            }
        }
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    },
    colors: ["rgb(85, 0, 101)", "rgb(0, 207, 183)"],
}

const PossessionChart = ({chartData} : Props) => {
    return (
        <ApexCharts options={Chart_option as any}
                    series={chartData}
                    type="bar"
                    height={90}/>
    );
};

export default PossessionChart;