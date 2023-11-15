import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../components/CustomDatatable';
import NotifyController from '../utilities/Toast';
import { Image } from 'primereact/image';
import PatientService from '../service/PatientService';


interface IFeedback {
    id: string,
    key: string,
    value: string,
}

const Patient = () => {
    const [refresh, setRefresh] = useState<boolean>(false)


    const onOptionChange = async (option: tableOptions) => {
        const patients = await PatientService.getInstance().getListPatient(option.page, option.rowPerPage).catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return {total: patients.data.totalRecords, data: patients.data.listUser}
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
                    <h5>Patient</h5>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                        onClickEnabled={true}
                    >
                        <Column field="createdAt" sortable body={bodyFormattedDateTime} header="Ngày tạo" headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="username" header="Tên người dùng" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="email" header="Email" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="phone" header="SĐT" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                    </CustomDataTable>
                </div>
            </div>
        </div>
    );
};

export default Patient;
