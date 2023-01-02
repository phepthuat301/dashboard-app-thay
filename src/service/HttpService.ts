import axios, { AxiosRequestConfig } from 'axios';
import NotifyController from '../utilities/Toast';
import { deleteToken, readToken } from './LocalStorageService';

export const httpApi = axios.create({
    baseURL: (process.env.REACT_APP_BE ?? ""),
});

httpApi.interceptors.request.use((config) => {
    config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` };

    return config;
});

export interface ApiErrorData {
    message: string;
}

export const httpGet = async (url: string, config?: AxiosRequestConfig) => {
    const result = await httpApi.get(url, config)
    if (result.status < 200 || result.status >= 400) {
        NotifyController.warning("Error Network")
        if (result.status === 401) {
            deleteToken()
        }
    }
    return result

}

export const httpPost = async (url: string, body: any, config?: AxiosRequestConfig) => {

    const result = await httpApi.post(url, body, config)
    if (result.status < 200 || result.status >= 400) {
        NotifyController.warning("Error Network")
        if (result.status === 401) {
            deleteToken()
        }
    }
    return result

}
export const httpPut = async (url: string, body: any, config?: AxiosRequestConfig) => {

    const result = await httpApi.put(url, body, config)
    if (result.status < 200 || result.status >= 400) {
        NotifyController.warning("Error Network")
        if (result.status === 401) {
            deleteToken()
        }
    }
    return result

}
export const httpDelete = async (url: string, body: any) => {

    const result = await httpApi.delete(url, body)
    if (result.status < 200 || result.status >= 400) {
        NotifyController.warning("Error Network")
        if (result.status === 401) {
            deleteToken()
        }
    }
    return result

}