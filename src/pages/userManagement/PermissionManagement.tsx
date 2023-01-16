import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomDataTable, filterApplyTemplate, filterClearTemplate, tableOptions } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { FormDialog } from '../../components/FormDialog';
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../../utilities/constant';
import Joi from 'joi';
import NotifyController from '../../utilities/Toast';
import UserService from '../../service/userManagement/UserService';

interface IRole {
    id: string,
    name: string,
    permission: Array<{ name: string, code: string }>
}
let defaultFormValue: IRole = {
    id: '',
    name: '',
    permission: []
};



const UserPermissionManagement = () => {
    const [permissions, setPermissions] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const [defaultData, setDefaultData] = useState<IRole>(defaultFormValue)
    const [deleteRoleDialog, setDeleteRoleDialog] = useState<boolean>(false);
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        console.log(rowData);

                        setDefaultData(rowData)
                        setFormDialogShow(true)
                        setRefresh(!refresh)
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2"
                    onClick={() => {
                        setDeleteRoleDialog(true)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: tableOptions) => {
        const roles = await UserService.getInstance().getRoles()
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
        return roles
    }


    const fields = [
        {
            name: 'name',
            label: 'Role Name',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.text,
            validate: Joi.string().min(3).required()
        },
        {
            name: 'permission',
            label: 'Permissions',
            multiselectValue: permissions,
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.multiSelect,
            validate: Joi.array().min(0).required()
        }
    ]

    useEffect(() => {
        UserService.getInstance().getAllPermission().then((res) => {
            const result = res.map((role: any) => ({
                name: role.name,
                code: role.code
            }))
            setPermissions(result)
        })
    }, [])

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Permission</h5>
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
                        <Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="permission" header="Permission" sortable headerStyle={{ minWidth: '10rem' }} body={(rowData: IRole) => <p>{rowData?.permission?.map(e => e.name)?.join(', ')}</p>}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteRoleDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteRoleDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteRoleDialog(false)
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

export default UserPermissionManagement;
