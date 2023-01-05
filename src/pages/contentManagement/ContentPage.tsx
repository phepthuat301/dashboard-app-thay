import React, { useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { OverlayPanel } from 'primereact/overlaypanel';
import ContentService from '../../service/contentManagement/ContentService';
import { CustomDataTable, customTableOptions, dateFilterTemplate, filterApplyTemplate, filterClearTemplate, selectFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { formatDate, threeDot } from '../../utilities/util';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { ContentStatusEnum } from '../../utilities/enums';

interface IContent {
    id: string;
    content: string;
    description: string;
    media: string;
    owner: IUser;
    status: string;
    created_at: Date;
    updated_at: Date;
}
interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}


const ContentPage = () => {
    const op = useRef<any>(null);
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [deleteContentDialog, setDeleteContentDialog] = useState<boolean>(false);
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
                        setRefresh(!refresh)
                        navigate("/content-management/content/" + rowData.id);
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2"
                    onClick={() => {
                        setDeleteContentDialog(true)
                        ContentService.getInstance().deleteContent(rowData.id)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const contents = await ContentService.getInstance().getContents()
        contents.data = contents.data.map((content: any) => {
            const created_at = new Date(content.created_at)
            const updated_at = new Date(content.updated_at)
            return { ...content, created_at, updated_at }
        })
        return contents
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Content</h5>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <CustomDataTable
                        dt={dt}
                        onOptionChange={onOptionChange}
                        refresh={refresh}
                    >
                        <Column field="content" header="Content" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="media" header="Video" sortable headerStyle={{ minWidth: '10rem' }}
                            body={(rowdata: IContent) => {
                                return (<>
                                    <Button type="button" label="Watch" onClick={(event) => { op.current.toggle(event); }} className="p-button-success" />
                                    <OverlayPanel ref={op} showCloseIcon>
                                        {typeof rowdata.media === "string" ? <video src={rowdata.media} controls style={{ maxHeight: 500 }}></video>
                                            : <DataTable value={rowdata.media} selectionMode="single" paginator rows={3} >
                                                <Column header="Image" body={(rowdata: any) => <img src={rowdata.url} alt="" className="product-image" width="50" style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} />}></Column>
                                                <Column field="url" header="Detail" body={(rowdata: any) => <a href={rowdata.url} target={"_blank"} rel={"noreferrer"}>{threeDot(rowdata.url, 30)}</a>}></Column>
                                            </DataTable>}

                                    </OverlayPanel>
                                </>)
                            }
                            }></Column>
                        <Column field="owner" header="Owner" sortable headerStyle={{ minWidth: '10rem' }} body={(rowdata: IContent) => <Button>{rowdata?.owner?.first_name} {rowdata?.owner?.last_name}</Button>} ></Column>
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IContent) => <p>{formatDate(rowdata.updated_at)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column field="status" header="Status" headerStyle={{ minWidth: '10rem' }} body={(rowdata: IContent) => <span className={`customer-badge status-${rowdata.status}`}>{rowdata.status}</span>} filter filterElement={selectFilterTemplate(Object.values(ContentStatusEnum))}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={deleteContentDialog}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            setDeleteContentDialog(false)
                            setRefresh(!refresh)
                        }}
                        onDeny={function (): void {
                            setDeleteContentDialog(false)
                        }} />
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
