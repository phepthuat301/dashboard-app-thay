

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useEffect, useRef, useState } from "react";

interface user {
    id: string,
    first_name: string,
    last_name: string,
    avatar: string,
    email: string,
}
interface BatchConfirmProps {
    data: Array<user>,
    selectedUser: Array<user> | null,
    setSelectedUser: (users: Array<user>) => void
}

export const BatchConfirm: React.FC<BatchConfirmProps> = ({ data, selectedUser, setSelectedUser }) => {
    const dt = useRef<any>(null);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Select User</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );
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
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="px-5">
                <div className="col-12">
                    <h2>Batch Update User</h2>
                </div>
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    ref={dt}
                    value={data}
                    selection={selectedUser}
                    onSelectionChange={(e) => setSelectedUser(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} user"
                    globalFilter={globalFilter}
                    emptyMessage="No user found."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="avatar" header="Photo" body={(rowData: user) => <img src={rowData.avatar} alt={rowData.email} height={40} style={{ borderRadius: "50%" }} />}></Column>
                    <Column field="fullname" header="Name" body={(rowData: user) => <p>{rowData.first_name} {rowData.last_name}</p>} sortable></Column>
                    <Column field="email" header="Email" sortable ></Column>

                </DataTable>
            </div>
        </>
    );
};
