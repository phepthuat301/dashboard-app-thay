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

    const onSubmit = () => {
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
                    if (res?.token) {
                        dispatch(setLogin(true))
                        NotifyController.success("Login Success")
                        navigate('/')
                    } else throw new Error("Login failed");
                })
                .catch((error) => NotifyController.error(error?.message))
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
        <div className="login-body">
            <div className="login-image">
                <img src={`${process.env.REACT_APP_ROOT_PATH}assets/layout/images/pages/login-${props.colorScheme === 'light' ? 'ondark' : 'onlight'}.png`} alt="atlantis" />
            </div>
            <div className="login-panel p-fluid">
                <div className="flex flex-column">
                    <div className="flex align-items-center mb-6 logo-container">
                        <img src={`${process.env.REACT_APP_ROOT_PATH}assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-logo" alt="login-logo" />
                        <img src={`${process.env.REACT_APP_ROOT_PATH}assets/layout/images/appname-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-appname" alt="login-appname" />
                    </div>
                    <div className="form-container">
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
                        <button className="flex p-link">Forgot your password?</button>
                    </div>
                    <div className="button-container">
                        <Button type="button" label="Login" onClick={onSubmit} />
                        {/* <span>
                            Don’t have an account?<button className="p-link">Sign-up here</button>
                        </span> */}
                    </div>
                </div>

                <div className="login-footer flex align-items-center">
                    <div className="flex align-items-center login-footer-logo-container">
                        <img src={process.env.REACT_APP_ROOT_PATH + "assets/layout/images/logo-gray.png"} className="login-footer-logo" alt="login-footer-logo" />
                        <img src={process.env.REACT_APP_ROOT_PATH + "assets/layout/images/appname-gray.png"} className="login-footer-appname" alt="login-footer-appname" />
                    </div>
                    <span>Copyright 2021</span>
                </div>
            </div>
        </div>
    );
};
