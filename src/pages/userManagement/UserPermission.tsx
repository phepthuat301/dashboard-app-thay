import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const multiselectValues = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
];
export const UserPermission: React.FC = () => {
    const [multiselectValue, setMultiselectValue] = useState<any>(null);
    const navigate = useNavigate()
    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    const selectedItemTemplate = (option: any) => {
        if (option) {
            return (
                <div className="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
                    <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                    <span>{option.name}</span>
                </div>
            );
        }

        return 'Select Countries';
    };

    return (
        <>
            <div className="grid p-fluid input-demo user-detail ">
                <div className="col-12 md:col-12">
                    <div className="card ">
                        <h5>Permission</h5>
                        <MultiSelect
                            value={multiselectValue}
                            onChange={(e) => setMultiselectValue(e.value)}
                            options={multiselectValues}
                            optionLabel="name"
                            placeholder="Select Countries"
                            filter
                            itemTemplate={itemTemplate}
                            selectedItemTemplate={selectedItemTemplate}
                            className="multiselect-custom"
                        />
                        <br />
                        <Button className="p-button save-permission p-component p-button-success mr-2 mb-2"
                            icon={<i className="pi pi-check"></i>}
                            onClick={() => {

                            }}>&nbsp;Save</Button>
                        <Button className="p-button save-permission p-component p-button-info mr-2 mb-2"
                            icon={<i className="pi pi-history"></i>}
                            onClick={() => {

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
