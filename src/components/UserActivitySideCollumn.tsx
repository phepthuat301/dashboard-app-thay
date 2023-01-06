import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Timeline } from 'primereact/timeline';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { ActivitiesActionEnum } from '../utilities/enums';
import { formatDate } from '../utilities/util';

interface UserActivityCollumnProps {
    title: string;
    subTitle: string;
    onPageChange: (page: IFilterOptions) => Promise<{
        total: number;
        data: Array<IActivity>
    }>;
}

interface IFilterOptions {
    from?: Date;
    to?: Date;
    page: number

}

interface IActivity {
    action: ActivitiesActionEnum,
    target: string,
    created_at: Date,
    updated_at: Date;
    user: IUser
}
interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}

let updateDataTimeout: any;

export const UserActivitySideCollumn: React.FC<UserActivityCollumnProps> = ({ title, subTitle, onPageChange }) => {

    const marker = (item: IActivity) => {
        return (
            <span className="custom-marker" style={{ backgroundColor: getColorByAction(item.action) }}>
                <i className={getIconByAction(item.action)}></i>
            </span>
        );
    };
    const content = (item: IActivity) => {
        return (
            <>
                <div className="flex align-items-center justify-content-between" >
                    <p>{getTitleByAction(item.action)}</p>
                    <h6
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            const url = readirectByAction(item.action, item.target)
                            if (url) {
                                navigate(url)
                            }
                        }}><i className='pi pi-info-circle' />&nbsp;Details</h6>
                </div>
                <span>{formatDate(item.created_at)}</span>
            </>
        );
    };
    const [activities, setActivities] = useState<IActivity[]>([])
    const [total, setTotal] = useState<number>(0)
    const [options, setOptions] = useState<IFilterOptions>({ page: 1 })
    const navigate = useNavigate()
    const onPageChangeHandle = async (page: IFilterOptions) => {
        const data = await onPageChange(page)
        if (data) {
            setActivities(data.data)
            setTotal(data.total)
        }
    }
    useEffect(() => {
        (async () => {
            if (updateDataTimeout)
                clearTimeout(updateDataTimeout);
            updateDataTimeout = setTimeout(() => {
                console.log(options);
                onPageChangeHandle(options)
                if (updateDataTimeout)
                    clearTimeout(updateDataTimeout);
            }, 200);
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])
    return (
        <div className="card widget-timeline">
            <div className="timeline-header flex justify-content-between align-items-center">
                <p>{title}</p>
                <br />
                <p className='subtitle' style={{
                    fontSize: 12,
                    color: "#868C9B"
                }}>{subTitle}</p>
            </div>
            <div className="timeline-header flex justify-content-between align-items-center">
                <Calendar
                    value={options.from}
                    onChange={(e: any) => setOptions({ ...options, from: new Date(e.target.value) })}
                    dateFormat="mm/dd/yy"
                    placeholder="from"
                    mask="99/99/9999" />
                &nbsp;
                <Calendar
                    value={options.to}
                    onChange={(e: any) => setOptions({ ...options, to: new Date(e.target.value) })}
                    dateFormat="mm/dd/yy"
                    placeholder="to"
                    mask="99/99/9999" />
                &nbsp;
                <Button
                    onClick={() => {
                        console.log({ ...options, from: undefined, to: undefined });
                        setOptions({ ...options, from: undefined, to: undefined })
                    }}>
                    <i className={`pi pi-filter-${(options?.from || options?.to) ? 'slash' : 'fill'}`} />
                </Button>
            </div>

            <div className="timeline-content">
                <Timeline value={activities} marker={marker} content={content} className="custimized-timeline" />
            </div>
            <div className='timeline-header'>
                {activities.length === 0 && <p> This user is currently have no activity</p>}
            </div>
            {Math.ceil(total / 5) > 1 && <ReactPaginate
                onPageChange={(e) => setOptions({ ...options, page: e.selected })}
                pageCount={Math.ceil(total / 5)}
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
            />}

            <br />
        </div>
    );
};


const getColorByAction = (action: ActivitiesActionEnum) => {
    let color = "rgb(15, 139, 253)"
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            color = "rgb(11, 209, 138)"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            color = "rgb(238, 229, 0)"
            break;
        case ActivitiesActionEnum.SEND_POST:
            color = "rgb(236, 77, 188)"
            break;
    }
    return color
}

const getIconByAction = (action: ActivitiesActionEnum) => {
    let icon = "pi pi-refresh"
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            icon = "pi pi-comment"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            icon = "pi pi-comments"
            break;
        case ActivitiesActionEnum.SEND_POST:
            icon = "pi pi-book"
            break;
    }
    return icon
}

const getTitleByAction = (action: ActivitiesActionEnum) => {
    let title = ""
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            title = "Sent a comment"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            title = "Sent a chat"
            break;
        case ActivitiesActionEnum.SEND_POST:
            title = "Created a post"
            break;
        case ActivitiesActionEnum.CREATE_ACCOUNT:
            title = "Signing up"
            break;
    }
    return title
}

const readirectByAction = (action: ActivitiesActionEnum, id: string) => {
    let url = ''
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            url = '/content-management/comment-' + id
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            url = '/chat-management/detail-' + id
            break;
        case ActivitiesActionEnum.SEND_POST:
            url = '/content-management/content-' + id
            break;
    }
    return url
}