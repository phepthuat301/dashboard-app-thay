import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../components/CustomDatatable';
import NotifyController from '../utilities/Toast';
import { Image } from 'primereact/image';
import PatientService from '../service/PatientService';
import { useParams } from 'react-router-dom';

const PatientDetail = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const { id } = useParams();

    const onOptionChange = async (option: tableOptions) => {
        const patients = await PatientService.getInstance().getPatientDetail(option.page, option.rowPerPage, id!).catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        console.log(patients)
        return { total: patients.data.totalRecords, data: patients.data.bloodSugarList }
    }

    const bodyAssetUrl = (rowData: any) => {
        return (
            <div className="p-3">
                <Image src={rowData.image_url} alt={rowData.image_url} width="120" preview />
            </div>
        );
    };

    const bodyIsLike = (rowData: any) => {
        return (
            <div className="p-field-icon">
                {rowData.is_like ? (
                    <i className="pi pi-thumbs-up"></i>
                ) : (
                    <i className="pi pi-thumbs-down"></i>
                )}
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

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Patient Detail</h5>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="test_date" sortable body={bodyFormattedDateTime} header="Ngày Test" headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="image_url" body={bodyAssetUrl} header="Ảnh" headerStyle={{ width: 120 }}></Column>
                        <Column field="blood_sugar_level" header="Chỉ số đường huyết" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                    </CustomDataTable>
                </div>
            </div>
        </div>
    );
};

export default PatientDetail;
