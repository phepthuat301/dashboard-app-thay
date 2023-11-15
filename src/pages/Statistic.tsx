import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import PatientService from "../service/PatientService";
import NotifyController from "../utilities/Toast";


const Statistic = () => {
    const [chart, setChart] = useState<any>({})

    const countryChart = {
        labels: ['RUS', 'Other', 'IND', 'AUS', 'JPN', 'USA', 'CHN'],
        datasets: [
            {
                data: [30, 18, 36, 54, 61, 90, 72],
                backgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
                hoverBackgroundColor: ['#0F8BFD', '#545C6B', '#EC4DBC', '#EEE500', '#FC6161', '#00D0DE', '#873EFE'],
                borderColor: 'transparent',
                fill: true
            }
        ]
    };

    const countryChartOptions = {
        responsive: true
    };

    const bodyFormattedDateTime = () => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return (
            <span>{formattedDate}</span>
        );
    };

    const getChart = async () => {
        const chart = await PatientService.getInstance().getStatistic().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        setChart(chart.data);
    }

    useEffect(() => {
        getChart()
    }, []);

    return (
        <div className="">
            <div className="card widget-country-graph">
                <div className="country-title">Thống kê về điểm danh bệnh nhân trong ngày {bodyFormattedDateTime()}</div>
                <div className="country-graph flex justify-content-center">
                    <Chart type="doughnut" id="country-chart" data={chart} options={countryChartOptions} style={{ position: 'relative', width: '75%' }}></Chart>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
