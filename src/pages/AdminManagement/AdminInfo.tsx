import Joi from "joi";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { FormDialog } from "../../components/FormDialog";
import { UserActivitySideCollumn } from "../../components/UserActivitySideCollumn";
import AdminService from "../../service/adminManagement/AdminService";
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from "../../utilities/constant";
import NotifyController from "../../utilities/Toast";

interface IAdmin {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    phone: string;
    sexuality: string;
    isVip: boolean;
    location: string;
    ethnicity: string;
    keen_on_meetings: Array<string>;
    topics: Array<string>;
    bonus_infomation: Array<{
        key: string;
        value: string;
    }>
}

export const AdminInfo: React.FC = () => {
    const { id } = useParams();
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const [banAdminConfirmDialogShow, setBanAdminConfirmDialogShow] = useState<boolean>(false);
    const [AdminDetail, setAdminDetail] = useState<IAdmin | null>()
    const navigate = useNavigate()
    useEffect(() => {
        AdminService
            .getInstance()
            .getAdminDetail(id ?? "")
            .then((res: IAdmin) => {
                setAdminDetail(res)
            })
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
    }, [id])


    const fields = [
        {
            name: 'warning',
            label: 'Warning',
            type: CUSTOM_FORM_DIALOG_FIELD_TYPE.slider,
            validate: Joi.number().max(300).required(),
            maxValue: 300
        }
    ]
    return (
        <>
            <div className="grid admin-detail">
                <div className="col-12 md:col-8">
                    <div className="card detail-content">
                        <h5>Detail</h5>
                        <div className="grid basic-info">
                            <div className="col-12">

                                <Avatar image={AdminDetail?.avatar} className="m-auto p-overlay-badge" shape="circle" style={{ width: 100, height: 100 }} />
                                <h4>{AdminDetail?.first_name + " " + AdminDetail?.last_name}</h4>
                                <p>{AdminDetail?.email}</p>

                            </div>

                        </div>
                    </div>

                    <div className="card">
                        <h5>Actions</h5>
                        <Button className="p-button p-component p-button-danger mr-2 mb-2"
                            icon={<i className="pi pi-Admin-minus"></i>}
                            onClick={() => {
                                setBanAdminConfirmDialogShow(true)
                            }}>&nbsp;Ban Admin</Button>
                        <Button className="p-button p-component p-button-warning mr-2 mb-2"
                            icon={<i className="pi pi-exclamation-triangle"></i>}
                            onClick={() => {
                                setFormDialogShow(true)
                            }}>&nbsp;Warning</Button>
                        <Button className="p-button p-component p-button-secondary mr-2 mb-2"
                            icon={<i className="pi pi-sign-out"></i>}
                            onClick={() => {
                                navigate('/Admin-management/Admin')
                            }}>&nbsp;Close</Button>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <UserActivitySideCollumn
                        title={"Activities"}
                        subTitle={AdminDetail?.first_name + " " + AdminDetail?.last_name}
                        onPageChange={async (options: {
                            from?: Date;
                            to?: Date;
                            page: number
                        }) => {
                            const AdminActivities = await AdminService.getInstance().getAdminActivities(id ?? "", options)
                            return AdminActivities
                        }} />
                </div>
            </div>
            <FormDialog
                show={formDialogShow}
                fields={fields}
                message={"Admin warning"}
                defaultValue={{
                    warning: 0
                }}
                onAccept={function (data: any): void {
                    AdminService
                        .getInstance()
                        .warningAdmin(id ?? "", data.warning)
                        ?.catch((error) => {
                            NotifyController.error(error?.message)
                            console.log(error);
                        })
                        ?.finally(() => setFormDialogShow(false));
                }}
                onDeny={function (): void {
                    setFormDialogShow(false)
                }} />
            <ConfirmDialog
                show={banAdminConfirmDialogShow}
                message={"Are you sure you will ban this Admin?"}
                onAccept={function (): void {
                    AdminService
                        .getInstance()
                        .banAdmin(id ?? "")
                        ?.catch((error) => {
                            NotifyController.error(error?.message)
                            console.log(error);
                        })
                        ?.finally(() => setBanAdminConfirmDialogShow(false))
                }} onDeny={function (): void {
                    setBanAdminConfirmDialogShow(false)
                }}
            />
        </>
    );
};
