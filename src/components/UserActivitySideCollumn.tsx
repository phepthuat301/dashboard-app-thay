
import { Avatar } from 'primereact/avatar';
import { Timeline } from 'primereact/timeline';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utilities/util';

interface UserActivityCollumnProps {
    title: string;
    subTitle: string;
    onPageChange: (page: number) => Promise<{
        total: number;
        data: Array<IActivity>
    }>;
}

interface IActivity {
    action: string,
    target: string,
    created_at: Date,
    icon: 'pi pi-check',
    iconColor: '#0F8BFD',
}

export const UserActivitySideCollumn: React.FC<UserActivityCollumnProps> = ({ title, subTitle, onPageChange }) => {
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
    const content = (item: IActivity) => {
        return (
            <>
                <div className="flex align-items-center justify-content-between">
                    <p>{item.action}</p>
                    <h6> {item.target}</h6>
                </div>
                <span>{formatDate(item.created_at)}</span>
            </>
        );
    };
    const [activities, setActivities] = useState<IActivity[]>([])
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()
    const onPageChangeHandle = async (page: number) => {
        const data = await onPageChange(page)
        if (data) {
            setActivities(data.data)
            setTotal(data.total)
        }
    }
    useEffect(() => {
        onPageChangeHandle(1)
    }, [])
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
            <div className="timeline-content">
                {/* <Timeline value={timelineEvents} marker={marker} content={content} className="custimized-timeline" /> */}
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
    );
};
