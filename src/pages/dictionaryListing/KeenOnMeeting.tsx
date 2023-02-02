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
    value: string,
}
let defaultFormValue: IKeenOnMeeting = {
    id: '',
    key: '',
    value: '',
};

const KeenOnMeeting = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IKeenOnMeeting>(defaultFormValue)
    const [deleteKeenOnMeetingDialog, setDeleteKeenOnMeetingDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setIsEdit(true);
                        setDefaultData(rowData)
                        setFormDialogShow(true)
                        setRefresh(!refresh)
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2"
                    onClick={() => {
                        setDefaultData(rowData)
                        setDeleteKeenOnMeetingDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: tableOptions) => {
        const keenOnMeetings = await KeenOnMeetingService.getInstance().getKeenOnMeeting().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return keenOnMeetings
    }
    const onSubmit = async (data: { key: string, value: string }) => {
        if (isEdit) {
            await KeenOnMeetingService.getInstance().editKeenOnMeeting({ id: defaultData.id, key: data.key, value: data.value }).then(res => NotifyController.success(res)).catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
            setFormDialogShow(false)
            setRefresh(!refresh)
            setIsEdit(false)
        } else {
            await KeenOnMeetingService.getInstance().addKeenOnMeeting(data.key, data.value).then(res => NotifyController.success(res)).catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
            setFormDialogShow(false)
            setRefresh(!refresh)
        }

    }

    const onDelete = async () => {
        await KeenOnMeetingService.getInstance().deleteKeenOnMeeting(defaultData.id).then(res => NotifyController.success(res)).catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        setDeleteKeenOnMeetingDialog(false)
        setRefresh(!refresh)
    }

    const onDeleteMany = async (listIds: any) => {
        await KeenOnMeetingService.getInstance().deleteKeenOnMeetings(listIds).then(res => NotifyController.success(res)).catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        setRefresh(!refresh)
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
                                        onDeleteMany(option.selected?.map(item => item.id))
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
                        <Column field="value" header="Value" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteKeenOnMeetingDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            onDelete()
                        }}
                        onDeny={function (): void {
                            setDeleteKeenOnMeetingDialog(false)
                        }} />
                    <FormDialog
                        show={formDialogShow}
                        fields={[
                            {
                                name: 'value',
                                label: 'Value',
                                type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
                                validate: Joi.string().min(4).required()
                            },
                            {
                                name: 'key',
                                label: 'Key',
                                type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
                                validate: Joi.string().min(4).required()
                            },
                        ]}
                        defaultValue={defaultData}
                        onAccept={function (data: any): void {
                            onSubmit(data);
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
