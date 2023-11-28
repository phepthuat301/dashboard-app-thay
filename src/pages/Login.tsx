import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import AuthService from '../service/AuthService';
import NotifyController from '../utilities/Toast';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

export const Login = (props: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [submitData, setSubmitData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<Joi.ValidationErrorItem[]>([])

    const onSubmit = (e: any) => {
        e.preventDefault();
        const validateSchema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(6).max(30).required(),
        })
        const validate = validateSchema.validate(submitData, {
            abortEarly: false
        })
        if (!validate.error) {
            setError([])
            AuthService
                .getInstance()
                .login(submitData.email, submitData.password)
                .then((res) => {
                    if (res?.data) {
                        dispatch(setLogin(true))
                        NotifyController.success("Login Success")
                        navigate('/')
                    } else throw new Error("Login failed");
                })
                .catch((error) => NotifyController.error(error.response.data.message))
        }
        else {
            setError(validate.error.details)
            console.log(validate.error.details);
        }
    }

    const onInputChange = (e: any, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _data = { ...submitData };
        // @ts-ignore
        _data[`${name}`] = val;
        setSubmitData(_data);
    };
    return (
        <div className="login-body2">
            <div className="login-panel p-fluid">
                <form onSubmit={onSubmit}> {/* Add the form element and attach the onSubmit handler */}
                    <div className="flex flex-column">
                        <div className="flex align-items-center mb-3" style={{ justifyContent: 'center' }}>
                            <h3 className='text-center'>LOGO</h3>
                        </div>
                        <div className="form-container" style={{ width: '500px' }}>
                            <span className="p-input-icon-left">
                                <i className="pi pi-envelope"></i>
                                <InputText type="text" placeholder="Email" value={submitData['email']} onChange={(e) => onInputChange(e, 'email')} />
                            </span>
                            <p className="p-error text-left">
                                {error.find(e => e.context?.key === 'email')?.message}
                            </p>
                            <span className="p-input-icon-left">
                                <i className="pi pi-key"></i>
                                <InputText type="password" placeholder="Password" value={submitData['password']} onChange={(e) => onInputChange(e, 'password')} />
                            </span>
                            <p className="p-error text-left">
                                {error.find(e => e.context?.key === 'password')?.message}
                            </p>
                            <button type="submit" className="flex p-link mb-3">Forgot your password?</button> {/* Change type to submit */}
                        </div>
                        <div className="button-container">
                            <Button type="button" label="Login" onClick={onSubmit} />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};
