import Joi from "joi";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Timeline } from "primereact/timeline";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { FormDialog } from "../../components/FormDialog";
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
    const timelineEvents = [
        {
            transaction: 'Payment from #28492',
            amount: '+$250.00',
            date: 'June 13, 2020 11:09 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Process refund to #94830',
            amount: '-$570.00',
            date: 'June 13, 2020 08:22 AM',
            icon: 'pi pi-refresh',
            iconColor: '#FC6161',
            amountColor: '#FC6161'
        },
        {
            transaction: 'New 8 user to #5849',
            amount: '+$50.00',
            date: 'June 12, 2020 02:56 PM',
            icon: 'pi pi-plus',
            iconColor: '#0BD18A',
            amountColor: '#0BD18A'
        },
        {
            transaction: 'Payment from #3382',
            amount: '+$3830.00',
            date: 'June 11, 2020 06:11 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Payment from #4738',
            amount: '+$845.00',
            date: 'June 11, 2020 03:50 AM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Payment failed form #60958',
            amount: '$1450.00',
            date: 'June 10, 2020 07:54 PM',
            icon: 'pi pi-exclamation-triangle',
            iconColor: '#EC4DBC',
            amountColor: '#EC4DBC'
        },
        {
            transaction: 'Payment from #5748',
            amount: '+$50.00',
            date: 'June 09, 2020 11:37 PM',
            icon: 'pi pi-check',
            iconColor: '#0F8BFD',
            amountColor: '#00D0DE'
        },
        {
            transaction: 'Removed 32 users from #5849',
            amount: '-$240.00',
            date: 'June 09, 2020 08:40 PM',
            icon: 'pi pi-minus',
            iconColor: '#FC6161',
            amountColor: '#FC6161'
        }
    ];
    const marker = (item: any) => {
        return (
            <span className="custom-marker" style={{ backgroundColor: item.iconColor }}>
                <i className={item.icon}></i>
            </span>
        );
    };
    const content = (item: any) => {
        return (
            <>
                <div className="flex align-items-center justify-content-between">
                    <p>{item.transaction}</p>
                    <h6 style={{ color: item.amountColor }}> {item.amount}</h6>
                </div>
                <span>{item.date}</span>
            </>
        );
    };

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
                                    {userDetail?.bonus_infomation.filter((info, index) => index % 2 === 0).map(info => <p>{info.key}: {info.value}</p>)}
                                </div>
                                <div className="col-12 md:col-6">
                                    {userDetail?.bonus_infomation.filter((info, index) => index % 2 !== 0).map(info => <p>{info.key}: {info.value}</p>)}
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
                    <div className="card widget-timeline">
                        <div className="timeline-header flex justify-content-between align-items-center">
                            <p>Activities</p>
                        </div>
                        <div className="timeline-content">
                            <Timeline value={timelineEvents} marker={marker} content={content} className="custimized-timeline" />
                        </div>
                        <ReactPaginate
                            onPageChange={(e) => { }}
                            pageCount={Math.ceil(3)}
                            previousLabel="Prev"
                            nextLabel="Next"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName='pagination'
                        />
                        <br />
                    </div>
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
