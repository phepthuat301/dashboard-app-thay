
import Axios from 'axios';
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class ConfigService {
    private static instance: ConfigService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ConfigService();
        }
        return this.instance;
    }
    async postUploadConfig(data: any) {
        const uploaded = await httpPost('dashboard/import-style', data)
        return uploaded.data
    }

    async importTemplate(data: any) {
        const uploaded = await httpPost('dashboard/import-style-v2', data)
        return uploaded.data
    }

    async putEditConfig(data: any) {
        const uploaded = await httpPut('dashboard/style', data)
        return uploaded.data
    }

    async deleteConfig(data: any) {
        const uploaded = await httpPost('dashboard/delete-styles', data)
        return uploaded
    }

    async getAllConfigs() {
        const data = await httpGet('dashboard/style')
        return data.data
    }
    async getAllStyles() {
        const token = localStorage.getItem('accessToken');

        const data = await Axios.get(process.env.REACT_APP_BE_WEB_API + '/sdstyle', {
            headers: {
                'Authorization': `Basic ${token}`
            },
        })
        return data.data
    }
    async postEditStyles(data: any) {
        const token = localStorage.getItem('accessToken');
        const result = await Axios.post(process.env.REACT_APP_BE_WEB_API + '/sdstyle', data, {
            headers: {
                'Authorization': `Basic ${token}`
            },
        })
        return result.data
    }
    async postAddStyles(data: any) {
        const token = localStorage.getItem('accessToken');
        const result = await Axios.post(process.env.REACT_APP_BE_WEB_API + '/sdstyle', data, {
            headers: {
                'Authorization': `Basic ${token}`
            },
        })
        return result.data
    }
    async deleteStyles(id: string) {
        const token = localStorage.getItem('accessToken');
        const result = await Axios.delete(process.env.REACT_APP_BE_WEB_API + '/sdstyle?id=' + id, {
            headers: {
                'Authorization': `Basic ${token}`
            },
        })
        return result.status
    }


    async getAllPromptCustomize() {
        const data = await httpGet('/dashboard/custom')
        return data.data
    }

    async putEditPromptCustomize(data: any) {
        const uploaded = await httpPut('dashboard/custom', data)
        return uploaded.data
    }

    async addNewConfigs(dataValue: any) {
        const data = await httpPost('dashboard/style', dataValue)
        return data.data
    }

    async uploadImage(file: any) {
        const data = await httpGet(`dashboard/signed-url?fileName=${new Date().getTime()}-${file.name}&fileType=${file.type}`)
        return data.data
    }

    async getCheckpoints() {
        const data = await httpGet('dashboard/sdstyle')
        return data.data
    }

    uploadFileS3(file: any, signedRequest: string, url: string) {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    return url
                } else {
                    //   alert("Could not upload file.");
                }
            }
        };
        xhr.send(file);
    };
    async getAllPose(type:string) {
        const data = await httpGet(`fashion/poses?type=${type}`)
        return data.data
    }
    // getConfigDetail(id: string) {
    //     return httpGet('assets/demo/data/content-detail.json').then((res) => res.data.data);
    // }

    // deleteConfig(id: string) {
    //     return httpDelete('').then((res) => res.data.data);
    // }
}
