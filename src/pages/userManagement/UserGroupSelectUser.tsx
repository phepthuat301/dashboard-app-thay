import { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import UserService from "../../service/userManagement/UserService";
import NotifyController from "../../utilities/Toast";
import ProfileTypeService from "../../service/dictionaryListing/ProfileTypeService";
import InterestTopicsService from "../../service/dictionaryListing/InterestTopicsService";
import SexualityService from "../../service/dictionaryListing/SexualityService";
import EthnicityService from "../../service/dictionaryListing/EthnicityService";
import KeenOnMeetingService from "../../service/dictionaryListing/KeenOnMeetingService";



export interface IUserGroupSelectUserOptions {
    ExtraMatchUserAllow: boolean
    ExtraMatchUser: string | null
    ExtraMatchEmailAllow: boolean
    ExtraMatchEmail: string | null
    UserHasProfilePhoto: boolean
    UserHasNoProfilePhoto: boolean
    UserHasBeenRegisteredForAtLeastXDaysAllow: boolean
    UserHasBeenRegisteredForAtLeastXDays: number | null
    UserHasBeenRegisteredForNoMoreThanXDaysAllow: boolean
    UserHasBeenRegisteredForNoMoreThanXDays: number | null
    UserHasRegisteredBeforeDateAllow: boolean
    UserHasRegisteredBeforeDate: Date | null
    UserHasRegisteredAfterDateAllow: boolean
    UserHasRegisteredAfterDate: Date | null
    UserHasNotVisitedForAtLeastXdaysAllow: boolean
    UserHasNotVisitedForAtLeastXdays: number | null
    UserHasAtleastXReferralsAllow: boolean
    UserHasAtleastXReferrals: number | null
    UserIsAtLeastXYearsOldAllow: boolean
    UserIsAtLeastXYearsOld: number | null
    UserIsNoMoreThanXYearsOldAllow: boolean
    UserIsNoMoreThanXYearsOld: number | null
    PasswordIsOlderThanXDaysAllow: boolean
    PasswordIsOlderThanXDays: number | null
    UserIsAMemberInsideOfSecondaryRoleAllow: boolean
    UserIsAMemberInsideOfSecondaryRole: Array<string>
    UserIsNotAMemberInsideOfSecondaryRoleAllow: boolean
    UserIsNotAMemberInsideOfSecondaryRole: Array<string>
    ProfileTypesAllow: boolean
    ProfileTypes: Array<string>
    InterestedTopicAllow: boolean
    InterestedTopic: Array<string>
    SexualityAllow: boolean
    Sexuality: Array<string>
    EthnicitysAllow: boolean
    Ethnicitys: Array<string>
    KeenOnMeetingsAllow: boolean
    KeenOnMeetings: Array<string>
}

interface UserGroupSelectUserProps {
    options: IUserGroupSelectUserOptions,
    setOptions: (options: IUserGroupSelectUserOptions) => void
}

export const UserGroupSelectUser: React.FC<UserGroupSelectUserProps> = ({ options, setOptions }) => {
    const [roles, setRoles] = useState<Array<{ key: string, value: string }>>([])
    const [profileTypes, setProfileTypes] = useState<Array<{ key: string, value: string }>>([])
    const [interestedTopic, setInterestedTopic] = useState<Array<{ key: string, value: string }>>([])
    const [sexuality, setSexuality] = useState<Array<{ key: string, value: string }>>([])
    const [ethnicitys, setEthnicitys] = useState<Array<{ key: string, value: string }>>([])
    const [keenOnMeetings, setKeenOnMeetings] = useState<Array<{ key: string, value: string }>>([])
    useEffect(() => {
        UserService.getInstance().getAllRoles().then(res => {
            setRoles(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        ProfileTypeService.getInstance().getAllProfileTypes().then(res => {
            setProfileTypes(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        InterestTopicsService.getInstance().getAllInterestTopicss().then(res => {
            setInterestedTopic(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        SexualityService.getInstance().getAllSexualitys().then(res => {
            setSexuality(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        EthnicityService.getInstance().getAllEthnicitys().then(res => {
            setEthnicitys(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        KeenOnMeetingService.getInstance().getAllKeenOnMeetings().then(res => {
            setKeenOnMeetings(res.map((e: any) => ({
                key: e.id,
                value: e.name
            })))
        }).catch((e) => NotifyController.error(e?.message))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderCheckBoxField = (checkboxField: keyof IUserGroupSelectUserOptions, text: string) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkOption1"
                        name="option"
                        checked={options[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[checkboxField] = e.checked
                            setOptions(clone)
                        }} />
                    <label htmlFor="checkOption1">{text}</label>
                </div>
            </div>
        </div>)
    }
    const renderCheckBoxFieldWithTextField = (checkboxField: keyof IUserGroupSelectUserOptions, textField: keyof IUserGroupSelectUserOptions, text: string) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkOption1"
                        name="option"
                        checked={options[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[checkboxField] = e.checked
                            setOptions(clone)
                        }} />
                    <label htmlFor="checkOption1">{text} </label>
                </div>
                <div className="col-12 md:col-6">
                    <InputText
                        disabled={!options[checkboxField]}
                        type="text"
                        placeholder="Enter text here"
                        style={{ width: '100%' }}
                        value={String(options[textField] ?? "")}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[textField] = e.target.value
                            setOptions(clone)
                        }} />
                </div>
            </div>
        </div>)
    }

    const renderCheckBoxFieldWithNumberField = (checkboxField: keyof IUserGroupSelectUserOptions, numberField: keyof IUserGroupSelectUserOptions, text: string) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkOption1"
                        name="option"
                        checked={options[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[checkboxField] = e.checked
                            setOptions(clone)
                        }} />
                    <label htmlFor="checkOption1">{text} </label>
                </div>
                <div className="col-12 md:col-6">
                    <InputText
                        disabled={!options[checkboxField]}
                        type="number"
                        placeholder="Enter number here"
                        style={{ width: '100%' }}
                        value={Number.parseInt(String(options[numberField] ?? ""))}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[numberField] = Number.parseInt(e.target.value)
                            setOptions(clone)
                        }}
                    />
                </div>
            </div>
        </div>)
    }

    const renderCheckBoxFieldWithCalendarField = (checkboxField: keyof IUserGroupSelectUserOptions, calendarField: keyof IUserGroupSelectUserOptions, text: string) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkOption1"
                        name="option"
                        checked={options[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[checkboxField] = e.checked
                            setOptions(clone)
                        }} />
                    <label htmlFor="checkOption1">{text} </label>
                </div>
                <div className="col-12 md:col-6">
                    <Calendar
                        disabled={!options[checkboxField]}
                        style={{ width: '100%' }}
                        value={new Date((options[calendarField] as Date) ?? "")}
                        dateFormat="mm/dd/yy"
                        placeholder="mm/dd/yyyy"
                        mask="99/99/9999"
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[calendarField] = new Date(e.value as any)
                            setOptions(clone)
                        }} />
                </div>
            </div>
        </div>)
    }

    const renderCheckBoxFieldWithChecklist = (checkboxField: keyof IUserGroupSelectUserOptions, optionsField: keyof IUserGroupSelectUserOptions, text: string, values: { key: string, value: string }[]) => {
        return (<div className="col-12 md:col-8 px-5">
            <div className="grid">
                <div className="col-12 md:col-6 field-checkbox">
                    <Checkbox
                        inputId="checkOption1"
                        name="option"
                        checked={options[checkboxField]}
                        onChange={(e) => {
                            const clone: any = { ...options }
                            clone[checkboxField] = e.checked
                            setOptions(clone)
                        }} />
                    <label htmlFor="checkOption1">{text} </label>
                </div>
                <div className="col-12" style={{ display: options[checkboxField] ? 'block' : 'none' }}>
                    {values.length === 0 ? "No options" : ""}
                    {values.map(value => {
                        return <>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Checkbox key={value.key}
                                inputId="checkOption2"
                                name="option"
                                checked={(options[optionsField] as Array<String>).includes(value.key)}
                                onChange={(e) => {
                                    const clone: any = { ...options }
                                    if (e.checked) {
                                        clone[optionsField] = [...clone[optionsField], value.key]
                                    } else {
                                        clone[optionsField] = (clone[optionsField] as Array<String>).filter(e => e !== value.key)
                                    }
                                    setOptions(clone)
                                }} />
                            <label htmlFor="checkOption2">&nbsp;{value.value}</label>
                            <br />
                            <br />
                        </>
                    })}
                </div>
            </div>
        </div>)
    }

    return (
        <>
            <div className="grid px-5">
                <div className="col-12">
                    <h2>UserGroup Update User</h2>
                </div>
                {renderCheckBoxFieldWithTextField('ExtraMatchUserAllow', 'ExtraMatchUser', 'Extra match user allow:')}
                {renderCheckBoxFieldWithTextField('ExtraMatchEmailAllow', 'ExtraMatchEmail', 'Extra match email:')}
                {renderCheckBoxField("UserHasProfilePhoto", "User has profile photo")}
                {renderCheckBoxField("UserHasNoProfilePhoto", "User has no profile photo")}
                {renderCheckBoxFieldWithNumberField('UserHasBeenRegisteredForAtLeastXDaysAllow', 'UserHasBeenRegisteredForAtLeastXDays', 'User has been registered for at least X days:')}
                {renderCheckBoxFieldWithNumberField('UserHasBeenRegisteredForNoMoreThanXDaysAllow', 'UserHasBeenRegisteredForNoMoreThanXDays', 'User has been registered for more than X days:')}
                {renderCheckBoxFieldWithCalendarField('UserHasRegisteredBeforeDateAllow', 'UserHasRegisteredBeforeDate', 'User has registered before date:')}
                {renderCheckBoxFieldWithCalendarField('UserHasRegisteredAfterDateAllow', 'UserHasRegisteredAfterDate', 'User has registered after date:')}
                {renderCheckBoxFieldWithNumberField('UserHasNotVisitedForAtLeastXdaysAllow', 'UserHasNotVisitedForAtLeastXdays', 'User has not visited for at least X days:')}
                {renderCheckBoxFieldWithNumberField('UserHasAtleastXReferralsAllow', 'UserHasAtleastXReferrals', 'User has at least X referrals:')}
                {renderCheckBoxFieldWithNumberField('UserIsAtLeastXYearsOldAllow', 'UserIsAtLeastXYearsOld', 'User is at least X years old:')}
                {renderCheckBoxFieldWithNumberField('UserIsNoMoreThanXYearsOldAllow', 'UserIsNoMoreThanXYearsOld', 'User is more than X years old:')}
                {renderCheckBoxFieldWithNumberField('PasswordIsOlderThanXDaysAllow', 'PasswordIsOlderThanXDays', 'Password is older than X days:')}
                {renderCheckBoxFieldWithChecklist('UserIsAMemberInsideOfSecondaryRoleAllow', 'UserIsAMemberInsideOfSecondaryRole', 'User is a member inside of secondary role:', roles)}
                {renderCheckBoxFieldWithChecklist('UserIsNotAMemberInsideOfSecondaryRoleAllow', 'UserIsNotAMemberInsideOfSecondaryRole', 'User is NOT a member inside of secondary role:', roles)}
                {renderCheckBoxFieldWithChecklist('ProfileTypesAllow', 'ProfileTypes', 'Profile type:', profileTypes)}
                {renderCheckBoxFieldWithChecklist('InterestedTopicAllow', 'InterestedTopic', 'Interested topic:', interestedTopic)}
                {renderCheckBoxFieldWithChecklist('SexualityAllow', 'Sexuality', 'Sexuality:', sexuality)}
                {renderCheckBoxFieldWithChecklist('EthnicitysAllow', 'Ethnicitys', 'Ethnicitys:', ethnicitys)}
                {renderCheckBoxFieldWithChecklist('KeenOnMeetingsAllow', 'KeenOnMeetings', 'Keen on meetings:', keenOnMeetings)}
            </div>
        </>
    );
};
