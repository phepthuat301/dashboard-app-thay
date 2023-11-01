import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../components/CustomDatatable';
import NotifyController from '../utilities/Toast';
import FeedbackService from '../service/FeedbackService';
import { Image } from 'primereact/image';


interface IFeedback {
    id: string,
    key: string,
    value: string,
}

const Feedback = () => {
    const [refresh, setRefresh] = useState<boolean>(false)


    const onOptionChange = async (option: tableOptions) => {
        const Feedbacks = await FeedbackService.getInstance().getListFeedback().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return Feedbacks
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
        const timestamp = rowData.created_ts;
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
                    <h5>Feedback</h5>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="created_ts" sortable body={bodyFormattedDateTime} header="Created" headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="device_token" header="Device Token" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        {/* <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column> */}
                        <Column field="content" header="Content" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        {/* <Column field="source" header="Source" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column> */}
                        <Column field="image_url" body={bodyAssetUrl} header="Asset" headerStyle={{ width: 120 }}></Column>
                        <Column field="is_like" body={bodyIsLike} header="Is Like" headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="type" header="Type" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                    </CustomDataTable>

                </div>
            </div>
        </div>
    );
};

export default Feedback;
