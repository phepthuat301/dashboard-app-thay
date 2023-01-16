import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
    const result = await httpApi.get(url, config).catch((e) => {
        checkHttpStatus(e.response)
        if (e.response.status === 403) {
            window.location.href = '../access'
        }
        throw e;
    })
    return result

}

export const httpPost = async (url: string, body: any, config?: AxiosRequestConfig) => {
    const result = await httpApi.post(url, body, config).catch((e) => {
        checkHttpStatus(e.response)
        throw e;
    })
    return result

}
export const httpPut = async (url: string, body: any, config?: AxiosRequestConfig) => {

    const result = await httpApi.put(url, body, config).catch((e) => {
        checkHttpStatus(e.response)
        throw e;
    })
    return result

}
export const httpDelete = async (url: string, body?: any) => {
    const result = await httpApi.delete(url, body ?? {}).catch((e) => {
        checkHttpStatus(e.response)
        throw e;
    })
    return result

}

export const checkHttpStatus = async (result: AxiosResponse<any>) => {
    if (result.status < 200 || result.status >= 400) {
        if (result.status === 401) {
            deleteToken()
        }
        if (result.status === 403) {
            NotifyController.error("No permission")
        }
        if (result.status >= 500) {
            window.location.href = '../error'
        } else {
            NotifyController.error("Error Network")
        }
        return null
    }
    return result

}