
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import NotificationService from '../service/NotificationService';
import NotifyController from '../utilities/Toast';

interface INotification {
    seen: boolean
    description: string
    create_at: Date
    title: string
}

export const RightSideNotification: React.FC = () => {
    const [show, setShow] = useState(false)
    const [notifications, setNotifications] = useState<INotification[]>([])
    useEffect(() => {
        // NotificationService
        //     .getInstance()
        //     .getNotifications()
        //     .then((res) => setNotifications(res))
        //     ?.catch((error) => {
        //         NotifyController.error(error?.message)
        //         console.log(error);
        //     })
    }, [])
    return (
        <>
            <li>
                <button className="p-link" onClick={() => setShow(true)}>
                    <i className="topbar-icon pi pi-fw pi-bell"></i>
                    {notifications.filter(no => no.seen).length > 0
                        && <span className="topbar-badge">{notifications.filter(no => no.seen).length}</span>
                    }
                    <span className="topbar-item-name">Notifications</span>
                </button>
            </li>
            <Sidebar visible={show} onHide={() => setShow(false)} baseZIndex={1000000} position="right">
                <div className="layout-rightmenu layout-rightmenu-active" style={{ borderRadius: 0 }}>
                    <button onClick={() => setShow(false)} className="layout-rightmenu-close p-link">
                        <i className="pi pi-times"></i>
                    </button>
                    <h3 style={{ fontWeight: 'normal' }}>Notifications</h3>
                    <div className="daily-plan-wrapper">
                        <ul>
                            {
                                notifications.map((notification, i) =>
                                    <li key={i}>
                                        <span className="event-time">{notification.create_at.toString()} - {notification.title}</span>
                                        <span className="event-topic">{notification.description}</span>
                                    </li>)
                            }

                        </ul>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};
