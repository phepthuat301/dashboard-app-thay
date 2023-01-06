import Joi from "joi";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormDialog } from "../../components/FormDialog";
import { UserActivitySideCollumn } from "../../components/UserActivitySideCollumn";
import { UserListCollumn } from "../../components/UserListCollumn";
import UserService from "../../service/userManagement/UserService";
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from "../../utilities/constant";

interface IUser {
    id: string;
    first_name: string;
    last_name: string;
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

export const UserInfo: React.FC = () => {
    const { id } = useParams();
    const [formDialogShow, setFormDialogShow] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<IUser | null>()
    const navigate = useNavigate()
    useEffect(() => {
        UserService.getInstance().getUserDetail(id ?? "").then((res: IUser) => {
            setUserDetail(res)
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
            <div className="grid user-detail">
                <div className="col-12 md:col-8">
                    <div className="card detail-content">
                        <h5>Detail</h5>
                        <div className="grid basic-info">
                            <div className="col-12 md:col-6 left-info">

                                <Avatar image={process.env.REACT_APP_ROOT_PATH + "assets/layout/images/dashboard/ann.png"} className="m-auto p-overlay-badge" shape="circle" style={{ width: 100, height: 100 }} />
                                <h4>{userDetail?.first_name + " " + userDetail?.last_name}</h4>
                                <p>{userDetail?.email}</p>

                            </div>
                            <div className="col-12 md:col-6 right-info">
                                <p><i className="pi pi-phone" /> Phone: {userDetail?.phone}</p>
                                <p><i className="pi pi-heart" /> Sex: {userDetail?.sexuality}</p>
                                <p><i className="pi pi-map" /> Location: {userDetail?.location}</p>
                                <p><i className="pi pi-star" /> Vip: {userDetail?.isVip ? "Yes" : "No"}</p>
                                <p><i className="pi pi-users" /> Ethnicity: {userDetail?.ethnicity} </p>
                                <p><i className="pi pi-eye" /> Keen On Meeting: {userDetail?.keen_on_meetings.join(', ')}</p>
                                <p><i className="pi pi-book" /> Interest Topics: {userDetail?.topics.join(', ')}</p>
                            </div>
                        </div>
                        {userDetail?.bonus_infomation && <div className="more-info">
                            <h5>More infomation </h5>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    {userDetail?.bonus_infomation.filter((info, index) => index % 2 === 0).map(info => <p key={info.key}>{info.key}: {info.value}</p>)}
                                </div>
                                <div className="col-12 md:col-6">
                                    {userDetail?.bonus_infomation.filter((info, index) => index % 2 !== 0).map(info => <p key={info.key}>{info.key}: {info.value}</p>)}
                                </div>
                            </div>
                        </div>}

                        <div className="post-list">
                            <h5>Posts </h5>
                            <Button className="p-button p-component p-button-info mr-2 mb-2"
                                icon={<i className="pi pi-search"></i>}
                                onClick={() => {
                                    navigate('/content-management/content?search=' + id)
                                }}>&nbsp;See post by Nguyen Ngoc Phuoc</Button>
                        </div>

                    </div>

                    <div className="card">
                        <h5>Actions</h5>
                        <Button className="p-button p-component p-button-danger mr-2 mb-2"
                            icon={<i className="pi pi-user-minus"></i>}
                            onClick={() => {
                                UserService.getInstance().banUser(id ?? "")
                            }}>&nbsp;Ban User</Button>
                        <Button className="p-button p-component p-button-warning mr-2 mb-2"
                            icon={<i className="pi pi-exclamation-triangle"></i>}
                            onClick={() => {
                                setFormDialogShow(true)
                            }}>&nbsp;Warning</Button>
                        <Button className="p-button p-component p-button-secondary mr-2 mb-2"
                            icon={<i className="pi pi-sign-out"></i>}
                            onClick={() => {
                                navigate('/user-management/user')
                            }}>&nbsp;Close</Button>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <UserListCollumn title={"Friends"} subTitle={"Friend list"}
                        onPageChange={async (page: number) => {
                            const result = await UserService.getInstance().getUserFriend(id ?? "")
                            return result
                        }} />
                    <UserListCollumn title={"Followers"} subTitle={"Follower list"}
                        onPageChange={async (page: number) => {
                            const result = await UserService.getInstance().getUserFollower(id ?? "")
                            return result
                        }} />
                    <UserActivitySideCollumn
                        title={"Activities"}
                        subTitle={userDetail?.first_name + " " + userDetail?.last_name}
                        onPageChange={async (options: {
                            from?: Date;
                            to?: Date;
                            page: number
                        }) => {
                            const userActivities = UserService.getInstance().getUserActivities(id ?? "", options)
                            return userActivities
                        }} />
                </div>
            </div>
            <FormDialog
                show={formDialogShow}
                fields={fields}
                message={"User warning"}
                defaultValue={{
                    warning: 0
                }}
                onAccept={function (data: any): void {
                    console.log(data);
                }}
                onDeny={function (): void {
                    setFormDialogShow(false)
                }} />
        </>
    );
};
