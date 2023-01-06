import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import UserService from '../../service/userManagement/UserService';
import { CustomDataTable, customTableOptions, dateFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { formatDate } from '../../utilities/util';
import { useNavigate } from 'react-router-dom';

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
    const dt = useRef<any>(null);
    const exportCSV = () => {
        dt.current.exportCSV();
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
                        UserService.getInstance().deleteUser(rowData.id)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const users = await UserService.getInstance().getUsers()
        return users
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>User</h5>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="user" header="User" sortable headerStyle={{ minWidth: '10rem' }}
                            body={(rowdata: IUser) => <>
                                <img alt={rowdata.first_name + " " + rowdata.last_name} src={rowdata.avatar} width={24} height={24} className="mr-2" style={{ verticalAlign: 'middle', borderRadius: '50%' }} />
                                <span className="image-text">{rowdata.first_name + " " + rowdata.last_name}
                                </span></>} />
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
