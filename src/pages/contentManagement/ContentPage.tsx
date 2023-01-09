import { useState } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ContentService from '../../service/contentManagement/ContentService';
import { CustomDataTable, customTableOptions, dateFilterTemplate, filterApplyTemplate, filterClearTemplate, selectFilterTemplate } from '../../components/CustomDatatable';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { formatDate, threeDot } from '../../utilities/util';
import { DataTable } from 'primereact/datatable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ContentStatusEnum } from '../../utilities/enums';
import { ShowPanelBtn } from '../../components/ShowPanelBtn';
import NotifyController from '../../utilities/Toast';

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
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [deleteContentID, setDeleteContentID] = useState<string | undefined>(undefined);
    const [searchParams] = useSearchParams();

    const actionBodyTemplate = (rowData: IContent) => {
        return (
            <div className="actions">
                <Button icon="pi pi-info-circle" className="p-button-rounded mr-2"
                    onClick={() => {
                        setRefresh(!refresh)
                        navigate("/content-management/content-" + rowData.id);
                    }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2"
                    onClick={() => {
                        setDeleteContentID(rowData.id)
                    }} />
            </div>
        );
    };

    const onOptionChange = async (option: customTableOptions) => {
        const contents = await ContentService
            .getInstance()
            .getContents()
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
        return contents
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Content</h5>

                    <CustomDataTable

                        onOptionChange={onOptionChange}
                        refresh={refresh}
                        defaultFilter={searchParams.get("search") ?? ""}
                    >
                        <Column field="content" header="Content" sortable headerStyle={{ minWidth: '10rem' }} filter filterClear={filterClearTemplate} filterApply={filterApplyTemplate}></Column>
                        <Column field="media" header="Media" sortable headerStyle={{ minWidth: '10rem' }}
                            body={(rowdata: IContent) => {
                                return (<>
                                    <ShowPanelBtn message={'Watch'}>
                                        {typeof rowdata.media === "string" ? <video src={rowdata.media} controls style={{ maxHeight: 500 }}></video>
                                            : <DataTable value={rowdata.media} selectionMode="single" paginator rows={3} >
                                                <Column header="Image" body={(rowdata: any) => <img src={rowdata.url} alt="" className="product-image" width="50" style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} />}></Column>
                                                <Column field="url" header="Detail" body={(rowdata: any) => <a href={rowdata.url} target={"_blank"} rel={"noreferrer"}>{threeDot(rowdata.url, 30)}</a>}></Column>
                                            </DataTable>}
                                    </ShowPanelBtn>
                                </>)
                            }
                            }></Column>
                        <Column field="owner" header="Owner" sortable headerStyle={{ minWidth: '10rem' }} body={(rowdata: IContent) => <Button onClick={() => navigate('/user-management/user-' + rowdata.id)}>{rowdata?.owner?.first_name} {rowdata?.owner?.last_name}</Button>} ></Column>
                        <Column field="updated_at" filterField="updated_at" dataType="date" header="Last update" body={(rowdata: IContent) => <p>{formatDate(rowdata.updated_at)}</p>} sortable headerStyle={{ minWidth: '10rem' }} filter filterElement={dateFilterTemplate}></Column>
                        <Column field="status" header="Status" headerStyle={{ minWidth: '10rem' }} body={(rowdata: IContent) => <span className={`customer-badge status-${rowdata.status}`}>{rowdata.status}</span>} filter filterElement={selectFilterTemplate(Object.values(ContentStatusEnum))}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </CustomDataTable>

                    <ConfirmDialog
                        show={!!deleteContentID}
                        message={'Please confirm the deletion of this item ?'}
                        onAccept={function (): void {
                            if (deleteContentID)
                                ContentService.getInstance().deleteContent(deleteContentID)
                                    .then(() => {
                                        NotifyController.success('Delete successfully')
                                    })
                                    .catch((error) => {
                                        NotifyController.error(error?.message)
                                        console.log(error);
                                    })
                                    .finally(() => {
                                        setDeleteContentID(undefined)
                                        setRefresh(!refresh)
                                    })

                        }}
                        onDeny={function (): void {
                            setDeleteContentID(undefined)
                        }} />
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
