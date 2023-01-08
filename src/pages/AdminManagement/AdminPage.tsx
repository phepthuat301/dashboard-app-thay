import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import AdminService from '../../service/adminManagement/AdminService';
import { CustomDataTable, customTableOptions, dateFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { formatDate } from '../../utilities/util';
import { useNavigate } from 'react-router-dom';
import NotifyController from '../../utilities/Toast';

interface IAdmin {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}


const AdminPage = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [deleteAdminDialog, setDeleteAdminDialog] = useState<boolean>(false);
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
                        navigate("/admin-management/admin-" + rowData.id);
                    }} />
                <Button icon="pi pi-key" className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        navigate(`/admin-management/admin-${rowData.id}?tab=Permission`);
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => {
                        setDeleteAdminDialog(true)
                        AdminService.getInstance().deleteAdmin(rowData.id).catch((error) => {
                            NotifyController.error(error?.message)
                            console.log(error);
                        })
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const admins = await AdminService.getInstance().getAdmins().catch((error) => {
            NotifyController.error(error?.message)
            console.log(error);
        })
        return admins
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Admin</h5>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="admin" header="Admin" sortable headerStyle={{ minWidth: '10rem' }}
                            body={(rowdata: IAdmin) => <>
                                <img alt={rowdata.first_name + " " + rowdata.last_name} src={rowdata.avatar} width={24} height={24} className="mr-2" style={{ verticalAlign: 'middle', borderRadius: '50%' }} />
                                <span className="image-text">{rowdata.first_name + " " + rowdata.last_name}
                                </span></>} />
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IAdmin) => <p>{formatDate(rowdata.updated_at)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteAdminDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteAdminDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteAdminDialog(false)
                        }} />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
