import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SpinWraper } from '../../components/SpinWraper';
import { AdminActivitiesActionEnum } from '../../utilities/enums';
import NotifyController from '../../utilities/Toast';
import { formatDate, getColorByActionActivities, getIconByActionActivities, getNameByActionActivities, getTitleByActionActivities, readirectByActionActivities } from '../../utilities/util';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import AdminService from '../../service/adminManagement/AdminService';


interface IFilterOptions {
    from?: Date;
    to?: Date;
    admin?: any;
    page: number

}

interface IActivity {
    action: AdminActivitiesActionEnum,
    target: string,
    created_at: Date,
    updated_at: Date;
    user: IUser
}
interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

let updateDataTimeout: any;

const AdminActivities = () => {

    const customizedContent = (item: IActivity) => {
        return (
            <Card title={item.user.first_name + " " + item.user.last_name} subTitle={formatDate(item.created_at)}>
                <a className="p-button-text" href={readirectByActionActivities(item.action, item.target)}>{getTitleByActionActivities(item.action)} </a>
            </Card>
        );
    };

    const customizedMarker = (item: IActivity) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2" style={{ backgroundColor: getColorByActionActivities(item.action) }}>
                <i className={classNames('marker-icon', getIconByActionActivities(item.action))}></i>
            </span>
        );
    };

    const [adminFilterTree, setAdminFilterTree] = useState();
    const [activities, setActivities] = useState<IActivity[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [options, setOptions] = useState<IFilterOptions>({ page: 1 })
    const onPageChangeHandle = async (options: IFilterOptions) => {
        const data = await AdminService.getInstance().getAllAdminActivities(options)
            .catch((error) => {
                NotifyController.error(error?.message)
                console.log(error);
            })
            .finally(() => setLoading(false))
        if (data) {
            setActivities(data.data)
            setTotal(data.total)
        }
    }
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (updateDataTimeout)
                clearTimeout(updateDataTimeout);
            updateDataTimeout = setTimeout(() => {
                console.log(options);
                onPageChangeHandle(options)
                if (updateDataTimeout)
                    clearTimeout(updateDataTimeout);
            }, 500);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options])
    useEffect(() => {
        (async () => {
            const actions = Object.values(AdminActivitiesActionEnum).map((action) => {
                return {
                    data: {
                        name: getNameByActionActivities(action),
                        action
                    },
                }
            })

            const admins = await AdminService.getInstance().getAllAdminList().catch((error) => {
                NotifyController.error(error?.message)
            })
            const result = admins.map((admin: any) => {
                return {
                    key: admin.id,
                    data: {
                        name: admin.first_name + " " + admin.last_name
                    },
                    children: actions.map((child) => ({ ...child, key: `${admin.id}_${child.data.action}` }))
                }
            })
            setAdminFilterTree(result)
        })()

    }, []);

    return (
        <div className="grid timeline-demo">
            <div className='col-12 lg:col-6'>
                <div className='card'>
                    <h5>Time Filter</h5>
                    <div className='flex justify-content-between align-items-center'>
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
                            className={`p-button-${(options?.from || options?.to) ? 'info' : 'secondary'}`}
                            onClick={() => {
                                setOptions({ ...options, from: undefined, to: undefined })
                            }}>
                            <i className={`pi pi-filter-${(options?.from || options?.to) ? 'slash' : 'fill'}`} />
                        </Button>
                    </div>
                </div>
                <div className="card">
                    <div className='flex justify-content-between align-items-center'>
                        <h5>Admin Filter</h5>
                        <Button
                            className={`p-button-${(options?.admin && Object.keys(options?.admin).length > 0) ? 'info' : 'secondary'}`}
                            onClick={() => {
                                setOptions({ ...options, admin: {} })
                            }}>
                            <i className={`pi pi-filter-${(options?.admin && Object.keys(options?.admin).length > 0) ? 'slash' : 'fill'}`} />
                        </Button>
                    </div>

                    <TreeTable value={adminFilterTree} selectionMode="checkbox" selectionKeys={options.admin} onSelectionChange={(e) => setOptions({ ...options, admin: e.value })}>
                        <Column field="name" header="Admins" expander></Column>
                    </TreeTable>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <SpinWraper isSpin={loading}>
                    <div className="card">
                        <h5>Admin Activities</h5>
                        <Timeline value={activities} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                    </div>
                </SpinWraper>
                {Math.ceil(total / 10) > 1 && <ReactPaginate
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
            </div>

        </div>
    );
};

export default AdminActivities;
