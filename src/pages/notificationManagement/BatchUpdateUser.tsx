

import { Steps } from 'primereact/steps';
import { useState } from 'react';
import { BatchSelectUser } from './BatchSelectUser';

enum TabMenuEnum {
    SELECT_USER,
    ACTIONS,
    CONFIRM
}

export const BatchUpdateUser: React.FC = () => {
    const [tab, setTab] = useState<TabMenuEnum>(TabMenuEnum.SELECT_USER)
    const [activeIndex, setActiveIndex] = useState(0)
    const userTabMenu = [
        { label: "Select User", command: () => { setTab(TabMenuEnum.SELECT_USER) } },
        { label: "Actions", command: () => { setTab(TabMenuEnum.ACTIONS) } },
        { label: "Confirm", command: () => { setTab(TabMenuEnum.CONFIRM) } },
    ];
    const renderContent = (tab: TabMenuEnum) => {
        let result = (<></>)
        switch (tab) {
            case TabMenuEnum.SELECT_USER:
                result = <BatchSelectUser />
                break;

            case TabMenuEnum.ACTIONS:
                result = <>b</>
                break;
            case TabMenuEnum.CONFIRM:
                result = <>c</>
                break;
        }
        return result
    }
    const nextStep = () => {
        switch (tab) {
            case TabMenuEnum.SELECT_USER:
                setTab(TabMenuEnum.ACTIONS)
                setActiveIndex(1)
                break;

            case TabMenuEnum.ACTIONS:
                setTab(TabMenuEnum.CONFIRM)
                setActiveIndex(2)
                break;
            case TabMenuEnum.CONFIRM:
                setTab(TabMenuEnum.SELECT_USER)
                setActiveIndex(0)
                break;
        }
    }
    return (
        <div className="batch-update-user">
            <div className='card'>
                <div className="steps-list">
                    <Steps model={userTabMenu} activeIndex={activeIndex} readOnly={true} />
                </div>
            </div>
            <br />
            {renderContent(tab)}
        </div>
    );
};
