import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppTopbar from './layout/AppTopbar';
import AppFooter from './layout/AppFooter';
import AppConfig from './layout/AppConfig';
import AppRightMenu from './layout/AppRightMenu';
import AppMenu from './layout/AppMenu';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { menu } from './utilities/Menu';
import { routes } from "./utilities/Routes";
import { NotFound } from './pages/NotFound';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import AppBreadcrumb from './layout/AppBreadcrumb';
import { persistMenuMode, readMenuMode } from './service/LocalStorageService';
import ProfileType from './pages/dictionaryListing/ProfileType';

const App = (props: any) => {
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const defaultMenuMode = readMenuMode() ?? 'sidebar'
    const [menuMode, setMenuMode] = useState(() => defaultMenuMode);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [ripple, setRipple] = useState(true);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [pinActive, setPinActive] = useState(false);
    const [activeInlineProfile, setActiveInlineProfile] = useState(false);
    const [resetActiveIndex, setResetActiveIndex] = useState<boolean>(false);
    const copyTooltipRef = useRef<any>();
    const location = useLocation();

    PrimeReact.ripple = true;

    let rightMenuClick: any;
    let configClick: any;
    let menuClick: any;
    let searchClick: boolean = false;
    let topbarItemClick: any;

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        setResetActiveIndex(true);
        setMenuActive(false);
    }, [menuMode]);

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!topbarItemClick) {
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
                setResetActiveIndex(true);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                setOverlayMenuActive(false);
                setStaticMenuMobileActive(false);
            }

            hideOverlayMenu();
            unblockBodyScroll();
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        topbarItemClick = false;
        menuClick = false;
        configClick = false;
        rightMenuClick = false;
        searchClick = false;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onMenuModeChange = (menuMode: any) => {
        persistMenuMode(menuMode)
        setMenuMode(menuMode);
        setOverlayMenuActive(false);
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuActiveChange = (active: any) => {
        setRightMenuActive(active);
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = (event: any) => {
        setConfigActive((prevState) => !prevState);
        configClick = true;
        event.preventDefault();
    };

    const onRippleChange = (e: any) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuButtonClick = (event: any) => {
        menuClick = true;

        if (isOverlay()) {
            setOverlayMenuActive((prevState) => !prevState);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevState) => !prevState);
        } else {
            setStaticMenuMobileActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const onRightMenuButtonClick = () => {
        rightMenuClick = true;
        setRightMenuActive(true);
    };

    const onTopbarItemClick = (event: any) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevState) => !prevState);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onToggleMenu = (event: any) => {
        menuClick = true;

        if (overlayMenuActive) {
            setOverlayMenuActive(false);
        }

        if (sidebarActive) {
            setSidebarStatic((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarMouseOver = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setSidebarActive(isDesktop());
            setTimeout(() => {
                setPinActive(isDesktop());
            }, 200);
        }
    };

    const onSidebarMouseLeave = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setTimeout(() => {
                setSidebarActive(false);
                setPinActive(false);
            }, 250);
        }
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onChangeActiveInlineMenu = (event: any) => {
        setActiveInlineProfile((prevState) => !prevState);
        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevState) => !prevState);
    };

    const onMenuItemClick = (event: any) => {
        if (!event.item.items) {
            hideOverlayMenu();
            setResetActiveIndex(true);
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const layoutClassName = classNames('layout-wrapper', {
        'layout-static': menuMode === 'static',
        'layout-overlay': menuMode === 'overlay',
        'layout-overlay-active': overlayMenuActive,
        'layout-slim': menuMode === 'slim',
        'layout-horizontal': menuMode === 'horizontal',
        'layout-active': menuActive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-sidebar': menuMode === 'sidebar',
        'layout-sidebar-static': menuMode === 'sidebar' && sidebarStatic,
        'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
        'p-ripple-disabled': !ripple
    });

    const onInputClick = () => {
        searchClick = true;
    };

    const breadcrumbClick = () => {
        searchClick = true;
        setSearchActive(true);
    };

    return (
        <div className={layoutClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <ToastContainer />
            <div className="layout-main">
                <AppTopbar
                    items={menu}
                    menuMode={menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={menuActive}
                    topbarMenuActive={topbarMenuActive}
                    activeInlineProfile={activeInlineProfile}
                    onTopbarItemClick={onTopbarItemClick}
                    onMenuButtonClick={onMenuButtonClick}
                    onSidebarMouseOver={onSidebarMouseOver}
                    onSidebarMouseLeave={onSidebarMouseLeave}
                    onToggleMenu={onToggleMenu}
                    onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                    onMenuClick={onMenuClick}
                    onMenuItemClick={onMenuItemClick}
                    onRootMenuItemClick={onRootMenuItemClick}
                    resetActiveIndex={resetActiveIndex}
                />

                <AppMenu
                    model={menu}
                    onRootMenuItemClick={onRootMenuItemClick}
                    onMenuItemClick={onMenuItemClick}
                    onToggleMenu={onToggleMenu}
                    onMenuClick={onMenuClick}
                    menuMode={menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={menuActive}
                    sidebarActive={sidebarActive}
                    sidebarStatic={sidebarStatic}
                    pinActive={pinActive}
                    onSidebarMouseLeave={onSidebarMouseLeave}
                    onSidebarMouseOver={onSidebarMouseOver}
                    activeInlineProfile={activeInlineProfile}
                    onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                    resetActiveIndex={resetActiveIndex}
                />
                <AppBreadcrumb routes={routes} onMenuButtonClick={onMenuButtonClick} menuMode={menuMode} onRightMenuButtonClick={onRightMenuButtonClick} onInputClick={onInputClick} searchActive={searchActive} breadcrumbClick={breadcrumbClick} />
                <div className="layout-main-content">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path={'dictionary-listing/1'} element={<ProfileType></ProfileType>}></Route>
                        {routes.map((route, key) => <Route key={key} path={route.path} >
                            {
                                route.childs && route.childs.map((child, key) => <Route key={key} path={child.path} element={child.element} />)
                            }
                        </Route>)}
                        <Route path="*" element={<NotFound colorScheme={props.colorScheme} />} />
                    </Routes>
                </div>

                <AppFooter colorScheme={props.colorScheme} />
            </div>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick} onRightMenuActiveChange={onRightMenuActiveChange} />

            <AppConfig
                configActive={configActive}
                onConfigButtonClick={onConfigButtonClick}
                onConfigClick={onConfigClick}
                menuMode={menuMode}
                changeMenuMode={onMenuModeChange}
                colorScheme={props.colorScheme}
                changeColorScheme={props.onColorSchemeChange}
                theme={props.theme}
                changeTheme={props.onMenuThemeChange}
                componentTheme={props.componentTheme}
                changeComponentTheme={props.onComponentThemeChange}
                ripple={ripple}
                onRippleChange={onRippleChange}
            />
        </div>
    );
};

export default App;
