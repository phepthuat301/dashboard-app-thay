import { useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import UserService from '../../service/userManagement/UserService';
import { CustomDataTable, dateFilterTemplate, filterApplyTemplate, filterClearTemplate, tableOptions } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { formatDate } from '../../utilities/util';
import { useNavigate } from 'react-router-dom';
import NotifyController from '../../utilities/Toast';

interface IUser {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}


const UserPage = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [deleteUserDialog, setDeleteUserDialog] = useState<boolean>(false);
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-info-circle" className="p-button-rounded mr-2"
                    onClick={() => {
                        navigate("/user-management/user-" + rowData.id);
                    }} />
                <Button icon="pi pi-key" className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        navigate(`/user-management/user-${rowData.id}?tab=Permission`);
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => {
                        setDeleteUserDialog(true)
                        UserService.getInstance().deleteUser(rowData.id).catch((error) => {
                            NotifyController.error(error?.message)
                            console.log(error);
                        })
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: tableOptions) => {
        const users = await UserService.getInstance().getUsers().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return users
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>User</h5>
                    <CustomDataTable
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="username" header="User Name" sortable headerStyle={{ minWidth: '10rem' }}
                            filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column field="warning" header="Warning Point" sortable headerStyle={{ minWidth: '10rem' }}
                            filter
                            dataType="numeric"
                        />
                        <Column field="user" header="Full Name" sortable headerStyle={{ minWidth: '10rem' }}
                            body={(rowdata: IUser) => <>
                                <img alt={rowdata.first_name + " " + rowdata.last_name} src={rowdata.avatar} width={24} height={24} className="mr-2" style={{ verticalAlign: 'middle', borderRadius: '50%' }} />
                                <span className="image-text">{rowdata.first_name + " " + rowdata.last_name}
                                </span></>} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column field="created_at" filterField="created_at" dataType="date" header="Create Time" body={(rowdata: IUser) => <p>{formatDate(rowdata.updated_at)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IUser) => <p>{formatDate(rowdata.updated_at)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteUserDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteUserDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteUserDialog(false)
                        }} />
                </div>
            </div>
        </div>
    );
};

export default UserPage;