import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import EthnicityService from '../../service/dictionaryListing/EthnicityService';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';
import NotifyController from '../../utilities/Toast';

interface IEthnicity {
    id: string,
    key: string,
    name: string,
}
let defaultFormValue: IEthnicity = {
    id: '',
    key: '',
    name: ''
};



const Ethnicity = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IEthnicity>(defaultFormValue)
    const [deleteEthnicityDialog, setDeleteEthnicityDialog] = useState<boolean>(false);
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
                        setDeleteEthnicityDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: tableOptions) => {
        const ethnicitys = await EthnicityService.getInstance().getEthnicitys()
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })


        return ethnicitys
    }


    const fields = [
        {
            name: 'key',
            label: 'Key',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(6).required()
        },
        {
            name: 'name',
            label: 'Name',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(6).required()
        },
    ]

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Ethnicity</h5>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
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
                    >
                        <Column field="key" header="key" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteEthnicityDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteEthnicityDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteEthnicityDialog(false)
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

export default Ethnicity;
