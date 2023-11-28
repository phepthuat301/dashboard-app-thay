import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../components/CustomDatatable';
import NotifyController from '../utilities/Toast';
import { Image } from 'primereact/image';
import PatientService from '../service/PatientService';
import { useParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Chart } from 'primereact/chart';

const getPreviousDate = () => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    return previousDate;
};

const countryChartOptions = {
    responsive: true
};

const PatientDetail = () => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [dates, setDates] = useState<any>([getPreviousDate(), new Date()]);
    const [chart, setChart] = useState<any>({})

    const { id } = useParams();

    const onOptionChange = async (option: tableOptions) => {
        const patients = await PatientService.getInstance().getPatientDetail(option.page, option.rowPerPage, id!).catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return { total: patients.data.totalRecords, data: patients.data.bloodSugarList }
    }

    const bodyAssetUrl = (rowData: any) => {
        return (
            <div className="p-3">
                <Image src={rowData.image_url} alt={rowData.image_url} width="120" preview />
            </div>
        );
    };

    const bodyFormattedDateTime = (rowData: any) => {
        const timestamp = rowData.createdAt;
        const date = new Date(timestamp); // Convert the timestamp to a Date object
        date.setHours(date.getHours() + 7); // Adjust for GMT+7 timezone

        // Format the date as needed (e.g., 'yyyy-MM-dd HH:mm:ss' format)
        const formattedDateTime = date.toISOString().replace("T", " ").split(".")[0];

        return (
            <span>{formattedDateTime}</span>
        );
    };


    const getChart = async () => {
        if (dates[0] && dates[1]) {
            const chart = await PatientService.getInstance().getStatistic(new Date(dates[0]).getTime(), new Date(dates[1]).getTime(), id).catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
            setChart(chart.data);
        }
    }

    useEffect(() => {
        getChart()
    }, [dates]);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Patient Detail</h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="grid crud-demo">
                            <div className="card widget-country-graph">
                                <Calendar className='mb-3' value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput />
                                <div className="country-title">Thống kê về điểm danh bệnh nhân</div>
                                <div className="country-graph flex justify-content-center">
                                    <Chart type="doughnut" id="country-chart" data={chart} options={countryChartOptions} style={{ position: 'relative', width: '75%' }}></Chart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="test_date" sortable body={bodyFormattedDateTime} header="Ngày Cập Nhập" headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="image_url" body={bodyAssetUrl} header="Ảnh" headerStyle={{ width: 120 }}></Column>
                    </CustomDataTable>
                </div>

            </div>
        </div>
    );
};

export default PatientDetail;
