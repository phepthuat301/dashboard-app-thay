import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { useSelector } from 'react-redux';
import { getUserState } from '../redux/reducers/userReducer';
import AuthService from '../service/AuthService';

const AppInlineMenu = (props: any) => {
    const menuRef = useRef(null);
    const user = useSelector(getUserState)
    const isSlim = () => {
        return props.menuMode === 'slim';
    };

    const isStatic = () => {
        return props.menuMode === 'static';
    };

    const isSidebar = () => {
        return props.menuMode === 'sidebar';
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    return (
        <>
            {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
                <div className={classNames('layout-inline-menu', { 'layout-inline-menu-active': props.activeInlineProfile })}>
                    <button className="layout-inline-menu-action p-link" onClick={props.onChangeActiveInlineMenu}>
                        <img src={user.avatar} alt="avatar" style={{ width: '44px', height: '44px' }} />
                        <span className="layout-inline-menu-text">{user.first_name + " " + user.last_name}</span>
                        <i className="layout-inline-menu-icon pi pi-angle-down"></i>
                    </button>
                    <CSSTransition nodeRef={menuRef} classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={props.activeInlineProfile} unmountOnExit>
                        <ul ref={menuRef} className="layout-inline-menu-action-panel">
                            <li className="layout-inline-menu-action-item">
                                <button className="p-link" onClick={() => AuthService.getInstance().logout()}>
                                    <i className="pi pi-power-off pi-fw"></i>
                                    <span >Logout</span>
                                </button>
                            </li>
                            {/* <li className="layout-inline-menu-action-item">
                                <button className="p-link">
                                    <i className="pi pi-cog pi-fw"></i>
                                    <span>Settings</span>
                                </button>
                            </li> */}
                            <li className="layout-inline-menu-action-item">
                                <button className="p-link">
                                    <i className="pi pi-user pi-fw"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                        </ul>
                    </CSSTransition>
                </div>
            )}
        </>
    );
};

export default AppInlineMenu;
