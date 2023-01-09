import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ReportedService from '../../service/reportedManagement/ReportedService';
import { CustomDataTable, customTableOptions, dateFilterTemplate, filterApplyTemplate, filterClearTemplate, selectFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';
import { ReportByEnum } from '../../utilities/enums';
import NotifyController from '../../utilities/Toast';
import { formatDate } from '../../utilities/util';
import { useNavigate } from 'react-router-dom';

interface IReported {
    id: string,
    report_by: ReportByEnum,
    user_report_id: string,
    reported_id: string,
    user_report?: IUser,
    reason: string,
    created_at?: Date,
    updated_at?: Date
}
interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}
let defaultFormValue: IReported = {
    id: "",
    report_by: ReportByEnum.USER,
    user_report_id: "",
    reason: "",
    reported_id: ''
};

const ReportedContentPage = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IReported>(defaultFormValue)
    const [deleteReportedID, setDeleteReportedID] = useState<string | null>(null);
    const [solveReportedID, setSolveReportedID] = useState<string | null>(null);

    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const navigate = useNavigate()

    const actionBodyTemplate = (rowData: IReported) => {
        return (
            <div className="actions">
                <Button icon="pi pi-times-circle" className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setSolveReportedID(rowData.id)
                    }} />
                <Button icon="pi pi-arrow-up-right" className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        navigate('/content-management/content-' + rowData.reported_id)
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => {
                        setDeleteReportedID(rowData.id)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const reporteds = await ReportedService
            .getInstance()
            .getReporteds()
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
        return reporteds
    }
    const fields = [
        {
            name: 'reported_id',
            label: 'Reported Id',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(6).required()
        },
        {
            name: 'reason',
            label: 'Reason',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.areaText,
            validate: Joi.string().min(6).required()
        },
    ]

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Reported</h5>
                    <CustomDataTable
                        leftToolbarBtn={[
                            {
                                name: "New",
                                icon: "pi-plus",
                                type: "Success",
                                onClick: () => {
                                    setDefaultData(defaultFormValue)
                                    setFormDialogShow(true)
                                    setRefresh(!refresh)
                                }
                            }
                        ]}
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="report_by" header="Report By" sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={selectFilterTemplate(Object.values(ReportByEnum))}></Column>
                        <Column header="User Report" sortable headerStyle={{ minWidth: '10rem' }} body={(dataRow: IReported) => dataRow.report_by === ReportByEnum.USER ? <p>{dataRow.user_report?.first_name + " " + dataRow.user_report?.last_name}</p> : <p>BOT</p>} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        {/* <Column field="reported_id" header="Reported Id" sortable headerStyle={{ minWidth: '10rem' }} ></Column> */}
                        <Column field="reason" header="Reason" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IReported) => <p>{rowdata.updated_at ? formatDate(rowdata.updated_at) : rowdata.updated_at}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={!!deleteReportedID}
                        message={'are you sure to delete it?'}
                        onAccept={function (): void {
                            if (deleteReportedID) {
                                ReportedService
                                    .getInstance()
                                    .deleteReported(deleteReportedID)
                                    .then(() => {
                                        setRefresh(!refresh)
                                    })
                                    .catch((error) => {
                                        NotifyController.error(error?.message)
                                        console.log(error);
                                    })
                                    .finally(() => setRefresh(!refresh))
                            }

                            setDeleteReportedID(null)

                        }}
                        onDeny={function (): void {
                            setDeleteReportedID(null)
                        }} />
                    <ConfirmDialog
                        show={!!solveReportedID}
                        message={'are you sure to ban it ?'}
                        onAccept={function (): void {
                            if (solveReportedID) {
                                ReportedService
                                    .getInstance()
                                    .banReported(solveReportedID)
                                    .then(() => {
                                        setRefresh(!refresh)
                                    })
                                    .catch((error) => {
                                        NotifyController.error(error?.message)
                                        console.log(error);
                                    })
                            }
                            setSolveReportedID(null)

                        }}
                        onDeny={function (): void {
                            setSolveReportedID(null)
                        }} />
                    <FormDialog
                        show={formDialogShow}
                        fields={fields}
                        defaultValue={defaultData}
                        onAccept={function (data: any): void {
                            console.log(data);
                        }}
                        onDeny={function (): void {
                            setFormDialogShow(false)
                        }} />
                </div>
            </div>
        </div>
    );
};

export default ReportedContentPage;
