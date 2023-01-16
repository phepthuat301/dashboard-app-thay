import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentListCollumn } from "../../components/contentManagement/CommentListCollumn";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import ContentService from "../../service/contentManagement/ContentService";
import NotifyController from "../../utilities/Toast";
import { ReportListCollumn } from "../../components/contentManagement/ReportListCollumn";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { threeDot } from "../../utilities/util";

export const ContentDetailPage: React.FC = () => {
    const { id } = useParams();
    const [banContentConfirmDialogShow, setBanContentConfirmDialogShow] = useState(false);
    const [content, setContent] = useState<any>(undefined)
    useEffect(() => {
        ContentService.getInstance().getContentDetail(id ?? "").then(result => setContent(result)).catch(e => NotifyController.error(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="grid user-detail">
                <div className="col-12 md:col-8">
                    <div className="card detail-content">
                        <h5>Detail</h5>
                        <p>{content?.content}</p>
                        {typeof content?.media === "string" ?
                            <div style={{ textAlign: 'center' }}>
                                <video src={content?.media} controls style={{ maxHeight: 500, margin: 'auto' }} />
                            </div>
                            : <DataTable value={content?.media} selectionMode="single" paginator rows={3} >
                                <Column header="Image" body={(report: any) => <img src={report.url} alt="" className="product-image" width="50" style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} />}></Column>
                                <Column field="url" header="Detail" body={(report: any) => <a href={report.url} target={"_blank"} rel={"noreferrer"}>{threeDot(report.url, 30)}</a>}></Column>
                            </DataTable>}
                        {content?.bonus_infomation && <div className="more-info">
                            <h5>More infomation </h5>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    {content?.bonus_infomation.filter((info: any, index: number) => index % 2 === 0).map((info: any) => <p key={info.key}>{info.key}: {info.value}</p>)}
                                </div>
                                <div className="col-12 md:col-6">
                                    {content?.bonus_infomation.filter((info: any, index: number) => index % 2 !== 0).map((info: any) => <p key={info.key}>{info.key}: {info.value}</p>)}
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className="card">
                        <h5>Actions</h5>
                        <Button className="p-button p-component p-button-danger mr-2 mb-2"
                            icon={<i className="pi pi-trash"></i>}
                            onClick={() => {
                                setBanContentConfirmDialogShow(true)
                            }}>&nbsp;Delete</Button>
                        <Button className="p-button p-component p-button-secondary mr-2 mb-2"
                            icon={<i className="pi pi-sign-out"></i>}
                            onClick={() => {

                            }}>&nbsp;Close</Button>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <CommentListCollumn
                        title={"Comment"}
                        subTitle={"Post comments"}
                        onPageChange={async (page: number) => {
                            const comments = ContentService.getInstance().getContentComments(id ?? "").catch(e => NotifyController.error(e?.message))
                            return comments
                        }} />
                    <ReportListCollumn
                        title={"Report by"}
                        subTitle={"Post reports"}
                        onPageChange={async (page: number) => {
                            const comments = ContentService.getInstance().getContentReports(id ?? "").catch(e => NotifyController.error(e?.message))
                            return comments
                        }} />

                </div>
            </div>
            <ConfirmDialog
                show={banContentConfirmDialogShow}
                message={"Are you sure you will ban this user?"}
                onAccept={function (): void {
                    setBanContentConfirmDialogShow(false)
                }} onDeny={function (): void {
                    setBanContentConfirmDialogShow(false)
                }}
            />
        </>
    );
};
