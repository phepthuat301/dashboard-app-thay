import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import ProfileTypeService from '../../service/dictionaryListing/ProfileTypeService';

import { CustomDataTable, customTableOptions, filterApplyTemplate, filterClearTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';

interface IProfileType {
    id: string,
    key: string,
    name: string,
}
let defaultFormValue: IProfileType = {
    id: '',
    key: '',
    name: '',
};

const ProfileType = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IProfileType>(defaultFormValue)
    const [deleteProfileTypeDialog, setDeleteProfileTypeDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);

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
                        setDeleteProfileTypeDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const profileTypes = await ProfileTypeService.getInstance().getProfileTypes()


        return profileTypes
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>ProfileType</h5>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}

                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="id" header="ID" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="key" header="Key" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteProfileTypeDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteProfileTypeDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteProfileTypeDialog(false)
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

export default ProfileType;
