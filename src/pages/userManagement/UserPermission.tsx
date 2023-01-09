
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../service/userManagement/UserService";
import NotifyController from "../../utilities/Toast";

export const UserPermission: React.FC = () => {
    const { id } = useParams();
    const [roles, setRoles] = useState<any>([]);
    const [currentRoles, setCurrentRoles] = useState<any>(null);
    const [selectedRoles, setSelectedRoles] = useState<any>(null);
    const navigate = useNavigate()
    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span>{option.name}</span>
            </div>
        );
    };

    const selectedItemTemplate = (option: any) => {
        if (option) {
            return (
                <div className="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
                    <span>{option.name}</span>
                </div>
            );
        }

        return 'Select Permission';
    };

    useEffect(() => {
        UserService
            .getInstance()
            .getAllRoles()
            .then((res) => {
                if (Array.isArray(res)) {
                    const roles = res.map((role) => ({
                        name: role.name, code: role.code
                    }))
                    setRoles(roles)
                    UserService.getInstance().getUserRolesByID(id ?? "").then((res) => {
                        if (Array.isArray(res)) {
                            const roles = res.map((role) => ({
                                name: role.name, code: role.code
                            }))
                            setCurrentRoles(roles)
                            setSelectedRoles(roles)
                        }
                    })
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="grid p-fluid input-demo user-detail ">
                <div className="col-12 md:col-12">
                    <div className="card ">
                        <h5>Permission</h5>
                        <MultiSelect
                            value={selectedRoles}
                            onChange={(e) => setSelectedRoles(e.value)}
                            options={roles}
                            optionLabel="name"
                            placeholder="Select Permission"
                            filter
                            itemTemplate={itemTemplate}
                            selectedItemTemplate={selectedItemTemplate}
                            className="multiselect-custom"
                        />
                        <br />
                        <Button className="p-button save-permission p-component p-button-success mr-2 mb-2"
                            icon={<i className="pi pi-check"></i>}
                            onClick={() => {
                                UserService
                                    .getInstance()
                                    .setRolesById(id ?? "", roles)
                                    .then(() => {
                                        NotifyController.success("Change user role success")
                                    }).catch((error) => {
                                        NotifyController.error(error?.message)
                                        setSelectedRoles(currentRoles)
                                    })
                            }}>&nbsp;Save</Button>
                        <Button className="p-button save-permission p-component p-button-info mr-2 mb-2"
                            icon={<i className="pi pi-history"></i>}
                            onClick={() => {
                                setSelectedRoles(currentRoles)
                            }}>&nbsp;Reset</Button>
                        <Button className="p-button save-permission p-component p-button-secondary mr-2 mb-2"
                            icon={<i className="pi pi-sign-out"></i>}
                            onClick={() => {
                                navigate('/user-management/user')
                            }}>&nbsp;Close</Button>
                    </div>

                </div>
            </div>
        </>
    );
};
