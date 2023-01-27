

import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { useState } from 'react';
import UserService from '../../service/userManagement/UserService';
import NotifyController from '../../utilities/Toast';
import { BatchConfirm } from './BatchConfirm';
import { BatchSelectActions, IBatchUpdateActions } from './BatchSelectActions';
import { BatchSelectUser, IBatchSelectUserOptions } from './BatchSelectUser';

enum TabMenuEnum {
    SELECT_USER,
    ACTIONS,
    CONFIRM
}



export const BatchUpdateUser: React.FC = () => {
    const [tab, setTab] = useState<TabMenuEnum>(TabMenuEnum.SELECT_USER)
    const [activeIndex, setActiveIndex] = useState(0)
    const [dataUser, setDataUser] = useState<Array<{
        id: string,
        first_name: string,
        last_name: string,
        avatar: string,
        email: string,
    }>>([])
    const [selectedUser, setSelectedUser] = useState<Array<{
        id: string,
        first_name: string,
        last_name: string,
        avatar: string,
        email: string,
    }> | null>(null)
    const [options, setOptions] = useState<IBatchSelectUserOptions>({
        ExtraMatchUserAllow: false,
        ExtraMatchUser: null,
        ExtraMatchEmailAllow: false,
        ExtraMatchEmail: null,
        UserHasProfilePhoto: false,
        UserHasNoProfilePhoto: false,
        UserHasBeenRegisteredForAtLeastXDaysAllow: false,
        UserHasBeenRegisteredForAtLeastXDays: null,
        UserHasBeenRegisteredForNoMoreThanXDaysAllow: false,
        UserHasBeenRegisteredForNoMoreThanXDays: null,
        UserHasRegisteredBeforeDateAllow: false,
        UserHasRegisteredBeforeDate: null,
        UserHasRegisteredAfterDateAllow: false,
        UserHasRegisteredAfterDate: null,
        UserHasNotVisitedForAtLeastXdaysAllow: false,
        UserHasNotVisitedForAtLeastXdays: null,
        UserHasAtleastXReferralsAllow: false,
        UserHasAtleastXReferrals: null,
        UserIsAtLeastXYearsOldAllow: false,
        UserIsAtLeastXYearsOld: null,
        UserIsNoMoreThanXYearsOldAllow: false,
        UserIsNoMoreThanXYearsOld: null,
        PasswordIsOlderThanXDaysAllow: false,
        PasswordIsOlderThanXDays: null,
        UserIsAMemberInsideOfSecondaryRoleAllow: false,
        UserIsAMemberInsideOfSecondaryRole: [],
        UserIsNotAMemberInsideOfSecondaryRoleAllow: false,
        UserIsNotAMemberInsideOfSecondaryRole: [],
        ProfileTypesAllow: false,
        ProfileTypes: [],
        InterestedTopicAllow: false,
        InterestedTopic: [],
        SexualityAllow: false,
        Sexuality: [],
        EthnicitysAllow: false,
        Ethnicitys: [],
        KeenOnMeetingsAllow: false,
        KeenOnMeetings: [],
    })
    const [actions, setActions] = useState<IBatchUpdateActions>({
        addUserToOrderRolesAllow: false,
        addUserToOrderRoles: null,
        removeUserFromOrderRolesAllow: false,
        removeUserFromOrderRoles: null,
        removeProfilePhotoAllow: false,
        removeProfilePhoto: null,
        banUsersAllow: false,
        banUsers: null,
        unbanUsersAllow: false,
        unbanUsers: null,
        selectPopupAdsAllow: false,
        selectPopupAds: null,
        sendAutomatedMessageAllow: false,
        sendAutomatedMessage: null,
        pushNotificationAllow: false,
        pushNotification: null,
        deleteUsersAllow: false,
        deleteUsers: null,
    })
    const userTabMenu = [
        { label: "Select User", command: () => { setTab(TabMenuEnum.SELECT_USER) } },
        { label: "Confirm", command: () => { setTab(TabMenuEnum.CONFIRM) } },
        { label: "Actions", command: () => { setTab(TabMenuEnum.ACTIONS) } },
    ];
    const renderContent = (tab: TabMenuEnum) => {
        let result = (<></>)
        switch (tab) {
            case TabMenuEnum.SELECT_USER:
                result = <BatchSelectUser options={options} setOptions={setOptions} />
                break;
            case TabMenuEnum.ACTIONS:
                result = <BatchSelectActions
                    actions={actions}
                    setActions={setActions}
                    selectedUser={selectedUser}
                    back={function (): void {
                        setTab(TabMenuEnum.CONFIRM)
                        setActiveIndex(1)
                    }} />
                break;
            case TabMenuEnum.CONFIRM:
                result = <BatchConfirm data={dataUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                break;
        }
        return result
    }
    const nextStep = () => {
        switch (tab) {
            case TabMenuEnum.SELECT_USER:
                const promise = UserService.getInstance().bacthUpdateSelectUser(options).then((res) => {
                    setDataUser(res)
                    setSelectedUser(res)
                    setTab(TabMenuEnum.CONFIRM)
                    setActiveIndex(1)
                }).catch((e) => {
                    NotifyController.error(e?.message)
                })
                NotifyController.promise(promise, "Searching...", "Searching user error", "Searching user success")
                break;
            case TabMenuEnum.CONFIRM:
                setTab(TabMenuEnum.ACTIONS)
                setActiveIndex(2)
                break;
            case TabMenuEnum.ACTIONS:

                break
        }
    }
    return (
        <div className="batch-update-user">
            <div className='card'>
                <div className="steps-list">
                    <Steps model={userTabMenu} activeIndex={activeIndex} readOnly={true} />
                </div>
                <br />
                {renderContent(tab)}
                <div className='flex next-btn-wraper'>
                    <Button className='next-btn' onClick={nextStep}>{tab !== TabMenuEnum.ACTIONS ? "Next" : "Excute"}</Button>
                </div>
            </div>
            <br />

        </div>
    );
};
