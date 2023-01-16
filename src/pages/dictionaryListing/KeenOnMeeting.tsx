import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import KeenOnMeetingService from '../../service/dictionaryListing/KeenOnMeetingService';

import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';
import NotifyController from '../../utilities/Toast';

interface IKeenOnMeeting {
    id: string,
    key: string,
    name: string,
}
let defaultFormValue: IKeenOnMeeting = {
    id: '',
    key: '',
    name: '',
};

const KeenOnMeeting = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IKeenOnMeeting>(defaultFormValue)
    const [deleteKeenOnMeetingDialog, setDeleteKeenOnMeetingDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setDefaultData(rowData)
                        setFormDialogShow(true)
                        setRefresh(!refresh)
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2"
                    onClick={() => {
                        setDeleteKeenOnMeetingDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: tableOptions) => {
        const keenOnMeetings = await KeenOnMeetingService.getInstance().getKeenOnMeetings().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return keenOnMeetings
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>KeenOnMeeting</h5>


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
                            },
                            {
                                name: "Delete",
                                icon: "pi-trash",
                                type: "Danger",
                                onClick: (option) => {
                                    if (option.selectAll || Number(option.selected?.length) > 0) {

                                    }
                                    else {
                                        NotifyController.warning("No rows selected")
                                    }
                                }
                            }
                        ]}
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >

                        <Column field="key" header="Key" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteKeenOnMeetingDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteKeenOnMeetingDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteKeenOnMeetingDialog(false)
                        }} />
                    <FormDialog
                        show={formDialogShow}
                        fields={[
                            {
                                name: 'name',
                                label: 'Name',
                                type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
                                validate: Joi.string().min(6).required()
                            },
                            {
                                name: 'key',
                                label: 'Key',
                                type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
                                validate: Joi.string().min(6).required()
                            },
                        ]}
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

export default KeenOnMeeting;
