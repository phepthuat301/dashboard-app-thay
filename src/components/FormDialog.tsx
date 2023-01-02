import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import Joi from 'joi'
import { CUSTOM_FORM_DIALOG_FIELD_TYPE } from '../utilities/constant';

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



export const FormDialog: React.FC<confirmDialogProps> = ({ show, message, fields, defaultValue, onAccept, onDeny }) => {
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
                            <label htmlFor={field.name}>{field.label}</label>
                            <InputText className={errorMessage ? 'p-invalid' : ''} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} />
                            <small id="username-help" className="p-error">
                                {errorMessage}
                            </small>
                        </div>
                    )
                break;
            case CUSTOM_FORM_DIALOG_FIELD_TYPE.number:
                result =
                    (
                        <div className="field" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <InputText className={errorMessage ? 'p-invalid' : ''} type={"number"} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} />
                            <small id="username-help" className="p-error">
                                {errorMessage}
                            </small>
                        </div>
                    )
                break;
            case CUSTOM_FORM_DIALOG_FIELD_TYPE.areaText:
                result =
                    (
                        <div className="field" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <InputTextarea className={errorMessage ? 'p-invalid' : ''} id={field.name} value={data[field.name]} onChange={(e) => onInputChange(e, field.name)} rows={3} cols={20} />
                            <small id="username-help" className="p-error">
                                {errorMessage}
                            </small>
                        </div>
                    )
                break;

        }
        return result
    }

    const DialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onDeny} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onSave} />
        </>
    );
    return (
        <>
            <Dialog visible={show} style={{ width: '450px' }} header=" Details" modal className="p-fluid" footer={DialogFooter} onHide={onDeny}>
                {
                    fields.map(generateField)
                }
            </Dialog>
        </>
    );
};
