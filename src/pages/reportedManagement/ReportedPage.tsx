import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import ReportedService from '../../service/reportedManagement/ReportedService';
import { CustomDataTable, customTableOptions, dateFilterTemplate, filterApplyTemplate, filterClearTemplate, selectFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';
import { ReportByEnum, ReportTypeEnum } from '../../utilities/enums';
import NotifyController from '../../utilities/Toast';
import { formatDate } from '../../utilities/util';
import { useNavigate } from 'react-router-dom';

interface IReported {
    id: string,
    report_type: ReportTypeEnum,
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
    report_type: ReportTypeEnum.CHAT,
    report_by: ReportByEnum.USER,
    user_report_id: "",
    reason: "",
    reported_id: ''
};

const ReportedPage = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IReported>(defaultFormValue)
    const [deleteReportedDialog, setDeleteReportedDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const navigate = useNavigate()
    const dt = useRef<any>(null);
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success"
                    onClick={() => {
                        setDefaultData(defaultFormValue)
                        setFormDialogShow(true)
                        setRefresh(!refresh)
                    }} />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: IReported) => {
        return (
            <div className="actions">
                <Button icon="pi pi-times-circle" className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setDeleteReportedDialog(true)
                        ReportedService.getInstance().banReported(rowData.id).then(() => {
                            setRefresh(!refresh)
                        })
                    }} />
                <Button icon="pi pi-arrow-up-right" className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        switch (rowData.report_type) {
                            case ReportTypeEnum.CHAT:
                                navigate('/chat-management/detail/' + rowData.reported_id)
                                break;
                            case ReportTypeEnum.COMMENT:
                                navigate('/content-management/comment/' + rowData.reported_id)
                                break;
                            case ReportTypeEnum.POST:
                                navigate('/content-management/content/' + rowData.reported_id)
                                break;
                            default:
                                NotifyController.warning("cant open !")
                                break;
                        }
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => {
                        setDeleteReportedDialog(true)
                        ReportedService.getInstance().deleteReported(rowData.id).then(() => {
                            setRefresh(!refresh)
                        })
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const reporteds = await ReportedService.getInstance().getReporteds()
        return reporteds
    }
    const selectValue = Object.values(ReportTypeEnum).map((value) => ({
        label: value,
        value: value
    }))

    const fields = [
        {
            name: 'report_type',
            label: 'Report Type',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.select,
            selectValue,
            validate: Joi.string().min(6).required()
        },
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
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}

                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="report_type" header="Report Type" sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={selectFilterTemplate(Object.values(ReportTypeEnum))}></Column>
                        <Column field="report_by" header="Report By" sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={selectFilterTemplate(Object.values(ReportByEnum))}></Column>
                        <Column header="User Report" sortable headerStyle={{ minWidth: '10rem' }} body={(dataRow: IReported) => dataRow.report_by === ReportByEnum.USER ? <p>{dataRow.user_report?.first_name + " " + dataRow.user_report?.last_name}</p> : <p>BOT</p>} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        {/* <Column field="reported_id" header="Reported Id" sortable headerStyle={{ minWidth: '10rem' }} ></Column> */}
                        <Column field="reason" header="Reason" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IReported) => <p>{rowdata.updated_at ? formatDate(rowdata.updated_at) : rowdata.updated_at}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteReportedDialog}
                        message={'are you sure ?'}
                        onAccept={function (): void {
                            setDeleteReportedDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteReportedDialog(false)
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

export default ReportedPage;
