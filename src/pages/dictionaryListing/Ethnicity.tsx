import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import EthnicityService from '../../service/dictionaryListing/EthnicityService';
import { threeDot } from '../../utilities/util';
import { CustomDataTable, customTableOptions, filterApplyTemplate, filterClearTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';

interface IEthnicity {
    id: string,
    slug: string,
    name: string,
    description: string
}
let defaultFormValue: IEthnicity = {
    id: '',
    slug: '',
    name: '',
    description: ''
};



const Ethnicity = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultEthnic, setDefaultEthnic] = useState<IEthnicity>(defaultFormValue)
    const [deleteEthnicityDialog, setDeleteEthnicityDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const dt = useRef<any>(null);
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2 mb-2"
                    onClick={() => {
                        setDefaultEthnic(defaultFormValue)
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
                        setDefaultEthnic(rowData)
                        setFormDialogShow(true)
                        setRefresh(!refresh)
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2"
                    onClick={() => {
                        setDeleteEthnicityDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const ethnicityService = new EthnicityService();
        const ethnicitys = await ethnicityService.getEthnicitys()
        console.log(option);

        return {
            total: 3,
            data: ethnicitys
        }
    }


    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(6).required()
        },
        {
            name: 'slug',
            label: 'Slug',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(6).required()
        },
        {
            name: 'description',
            label: 'Description',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.areaText,
            validate: Joi.string().min(6).required()
        },
    ]

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Ethnicity</h5>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}

                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="id" header="ID" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="slug" header="Slug" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="description" header="description" body={(rowdata: any) => <p>{threeDot(rowdata.description, 20)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
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
                        defaultValue={defaultEthnic}
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
