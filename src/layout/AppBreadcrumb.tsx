
import { useLocation } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';

const AppBreadcrumb = (props: any) => {
    const location = useLocation();

    let activeRoute: any = null
    props.routes.forEach((route: any) => {
        const currrentPath = location.pathname.toLowerCase().replace(/\s/g, '').slice(1)
        const routePath = route.path.replace(/\s/g, '').toLowerCase()
        route.childs.forEach((child: any) => {
            const currrentPath = location.pathname.toLowerCase().replace(/\s/g, '').slice(1)
            const childPath = routePath + "/" + child.path.replace(/\s/g, '').toLowerCase()
            child.parent = route.label
            if (childPath === currrentPath) activeRoute = child
        });
        if (routePath === currrentPath) activeRoute = route
    });

    let items;
    if (location.pathname === '/') {
        items = [{ label: 'Dashboard' }, { label: 'Dashboard' }];
    } else if (!activeRoute) {
        items = [{ label: '' }, { label: '' }];
    } else {
        items = [{ label: activeRoute.parent }, { label: activeRoute.label }];
    }

    const isStatic = () => {
        return props.menuMode === 'static';
    };

    return (
        <div className="layout-breadcrumb-container">
            <div className="layout-breadcrumb-left-items">
                {isStatic() && (
                    <button className="menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>
                )}

                <BreadCrumb model={items} className="layout-breadcrumb" />
            </div>
            <div className="layout-breadcrumb-right-items">


                <span className="layout-rightmenu-button-desktop">
                    <Button label="Today" icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span>

                <span className="layout-rightmenu-button-mobile">
                    <Button icon="pi pi-bookmark" className="layout-rightmenu-button" onClick={props.onRightMenuButtonClick}></Button>
                </span>
            </div>
        </div>
    );
};

export default AppBreadcrumb;
