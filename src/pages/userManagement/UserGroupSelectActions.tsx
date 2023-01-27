

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

interface user {
    id: string | null,
    first_name: string | null,
    last_name: string | null,
    avatar: string | null,
    email: string | null,
}

export interface IUserGroupUpdateActions {
    addUserToOrderRolesAllow: boolean,
    addUserToOrderRoles: string | null,
    removeUserFromOrderRolesAllow: boolean,
    removeUserFromOrderRoles: string | null,
    removeProfilePhotoAllow: boolean,
    removeProfilePhoto: string | null,
    banUsersAllow: boolean,
    banUsers: string | null,
    unbanUsersAllow: boolean,
    unbanUsers: string | null,
    selectPopupAdsAllow: boolean,
    selectPopupAds: string | null,
    sendAutomatedMessageAllow: boolean,
    sendAutomatedMessage: string | null,
    pushNotificationAllow: boolean,
    pushNotification: string | null,
    deleteUsersAllow: boolean,
    deleteUsers: string | null,
}
interface UserGroupSelectActionProps {
    selectedUser: Array<user> | null,
    actions: IUserGroupUpdateActions
    setActions: (actions: IUserGroupUpdateActions) => void
    back: () => void
}

export const UserGroupSelectActions: React.FC<UserGroupSelectActionProps> = ({ selectedUser, back, actions, setActions }) => {

    const renderCheckBoxFieldWithCheckBox = (checkboxField: keyof IUserGroupUpdateActions, secCheckboxField: keyof IUserGroupUpdateActions, text: string, text2: string) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkAction1"
                        name="action"
                        checked={actions[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...actions }
                            clone[checkboxField] = e.checked
                            setActions(clone)
                        }} />
                    <label htmlFor="checkAction1">{text} </label>
                </div>
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkAction1"
                        name="action"
                        disabled={!actions[checkboxField]}
                        checked={actions[secCheckboxField]}
                        onChange={(e) => {
                            const clone: any = { ...actions }
                            clone[secCheckboxField] = e.checked
                            setActions(clone)
                        }} />
                    <label htmlFor="checkAction1">{text2} </label>
                </div>

            </div>
        </div>)
    }

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="grid px-5">
                <div className="col-12">
                    <h2>UserGroup Update User</h2>


                </div>
                <div className="col-12 md:col-8 px-5">
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <p>Matched user</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <p> {selectedUser?.length} - <span onClick={back} className="text-link" >View list</span></p>
                        </div>
                        {renderCheckBoxFieldWithCheckBox('removeProfilePhotoAllow', 'removeProfilePhoto', 'Remove profile photo', 'Yes')}
                        {renderCheckBoxFieldWithCheckBox('banUsersAllow', 'banUsers', 'Ban Users', 'Yes')}
                        {renderCheckBoxFieldWithCheckBox('unbanUsersAllow', 'unbanUsers', 'Un-Ban Users', 'Yes')}


                    </div>
                </div>
            </div>

        </>
    );
};
