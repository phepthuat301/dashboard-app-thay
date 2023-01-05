import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import Joi from 'joi'
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../utilities/constant';
import { Sidebar } from 'primereact/sidebar';

interface confirmDialogProps {
    show: boolean;
    message?: string;
    fields: IDialogField[];
    defaultValue: any;
    onAccept: (data: any) => void;
    onDeny: () => void;
}

interface IDialogField {
    name: string;
    label: string;
    type: CUSTOM_FORM_DIALOG_FIELD_TYPE;
    validate: any;
}



export const FullScreenFormDialog: React.FC<confirmDialogProps> = ({ show, message, fields, defaultValue, onAccept, onDeny }) => {
    const [data, setData] = useState<any>(defaultValue);
    const [error, setError] = useState<Joi.ValidationErrorItem[]>([])

    useEffect(() => {
        setData(defaultValue)
    }, [defaultValue])
    const onInputChange = (e: any, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _data = { ...data };
        // @ts-ignore
        _data[`${name}`] = val;
        setData(_data);
    };

    const onSave = () => {
        const objSchema: any = {}
        for (const field of fields) {
            objSchema[field.name] = field.validate
        }
        const validateSchema = Joi.object(objSchema).unknown()
        const validate = validateSchema.validate(data, {
            abortEarly: false
        })
        if (!validate.error)
            onAccept(data)
        else {
            setError(validate.error.details)
            console.log(validate.error.details);
        }
    }

    const generateField = (field: IDialogField) => {
        let result = <></>
        const errorMessage = error.find(e => e.context?.key === field.name)?.message

        switch (field.type) {
            case CUSTOM_FORM_DIALOG_FIELD_TYPE.text:
                result =
                    (
                        <div className="field" key={field.name}>
                            <h5>{field.label}</h5>
                            <div className="grid p-formgrid">
                                <div className="col-12 mb-2">
                                    <InputText className={errorMessage ? 'p-invalid' : ''} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} />
                                    <small id="username-help" className="p-error">
                                        {errorMessage}
                                    </small>
                                </div>
                            </div>
                        </div>
                    )
                break;
            case CUSTOM_FORM_DIALOG_FIELD_TYPE.number:
                result =
                    (
                        <div className="field" key={field.name}>
                            <h5>{field.label}</h5>
                            <div className="grid p-formgrid">
                                <div className="col-12 mb-2">
                                    <InputText className={errorMessage ? 'p-invalid' : ''} type={"number"} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} />
                                    <small id="username-help" className="p-error">
                                        {errorMessage}
                                    </small>
                                </div></div>
                        </div>
                    )
                break;
            case CUSTOM_FORM_DIALOG_FIELD_TYPE.areaText:
                result =
                    (
                        <div className="field" key={field.name}>
                            <h5>{field.label}</h5>
                            <div className="grid p-formgrid">
                                <div className="col-12 mb-2">
                                    <InputTextarea className={errorMessage ? 'p-invalid' : ''} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} rows={3} cols={20} />
                                    <small id="username-help" className="p-error">
                                        {errorMessage}
                                    </small>
                                </div>
                            </div>
                        </div>
                    )
                break;

        }
        return result
    }
    return (
        <>
            <Sidebar visible={show} onHide={onDeny} baseZIndex={1000000} fullScreen style={{ margin: 10 }}>
                <div className="grid p-fluid input-demo">
                    <div className="col-12 lg:col-6">
                        <div className="card">
                            {
                                fields.filter((e, i) => i % 2 === 0).map(generateField)
                            }
                        </div>
                    </div>
                    <div className="col-12 lg:col-6">
                        <div className="card">
                            {
                                fields.filter((e, i) => i % 2 !== 0).map(generateField)
                            }
                        </div>
                    </div>
                    <div className='m-auto flex'>
                        <Button className='mr-2 mb-2 p-2 px-5' label="Save" onClick={onSave} />
                        <Button className='p-button-danger mr-2 mb-2 p-2 px-5' label="Cancel" onClick={onDeny} />
                    </div>
                </div>
            </Sidebar>
        </>
    );
};
