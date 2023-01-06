
import { useEffect, useState } from "react";
import { TabMenu } from 'primereact/tabmenu';
import { UserInfo } from "./UserInfo";
import { UserPermission } from "./UserPermission";
import { useSearchParams } from "react-router-dom";
enum TabMenuEnum {
    PROFILE = 'Profile',
    PERMISSION = 'Permission'
}

export const UserDetailPage: React.FC = () => {
    const [tab, setTab] = useState<TabMenuEnum>(TabMenuEnum.PROFILE)
    const [activeIndex, setActiveIndex] = useState(0)
    const userTabMenu = [
        { label: 'Profile', command: () => { setTab(TabMenuEnum.PROFILE) } },
        { label: 'Permission', command: () => { setTab(TabMenuEnum.PERMISSION) } },
    ];
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab) {
            if (TabMenuEnum.PROFILE.toLowerCase() === tab.toLowerCase()) {
                setActiveIndex(0)
                setTab(TabMenuEnum.PROFILE)
            }

            if (TabMenuEnum.PERMISSION.toLowerCase() === tab.toLowerCase()) {
                setActiveIndex(1)
                setTab(TabMenuEnum.PERMISSION)
            }

        }
    }, [searchParams])
    const renderContent = (tab: TabMenuEnum) => {
        let result = (<></>)
        switch (tab) {
            case TabMenuEnum.PROFILE:
                result = <UserInfo />
                break;

            case TabMenuEnum.PERMISSION:
                result = <UserPermission />
                break;
        }
        return result
    }
    return (
        <>
            <TabMenu model={userTabMenu} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <br />
            {renderContent(tab)}
        </>
    );
};
