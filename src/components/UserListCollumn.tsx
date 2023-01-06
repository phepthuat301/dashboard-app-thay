
import { Avatar } from 'primereact/avatar';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utilities/util';

interface userListCollumnProps {
    title: string;
    subTitle: string;
    onPageChange: (page: number) => Promise<{
        total: number;
        data: Array<userProps>
    }>;
}

interface userProps {
    id: string;
    avatar: string;
    full_name: string;
    created_at: Date;
}

export const UserListCollumn: React.FC<userListCollumnProps> = ({ title, subTitle, onPageChange }) => {
    const [users, setUsers] = useState<userProps[]>([])
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()
    const onPageChangeHandle = async (page: number) => {
        const data = await onPageChange(page)
        if (data) {
            setUsers(data.data)
            setTotal(data.total)
        }
    }
    useEffect(() => {
        onPageChangeHandle(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="card widget-performance">
            <div className="header">
                <span>{title}</span>
                <p className="subtitle">{subTitle}</p>
            </div>
            <div className="content">
                <ul>
                    {users.map((user, i) =>
                        <li key={i} className="person-item" style={{ cursor: "pointer" }} onClick={() => navigate("/user-management/user-" + user.id)}>
                            <Avatar image={user.avatar} className="mr-2 p-overlay-badge" shape="circle" />
                            <div className="person-info">
                                <div className="amount">{user.full_name}</div>
                                <div className="name">since {formatDate(user.created_at)}</div>
                            </div>
                        </li>)
                    }
                </ul>
                {users.length === 0 && <p>No users</p>}
                {Math.ceil(total / 5) > 1 && <ReactPaginate
                    onPageChange={(e) => { onPageChangeHandle(e.selected) }}
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
            </div>
        </div>
    );
};
