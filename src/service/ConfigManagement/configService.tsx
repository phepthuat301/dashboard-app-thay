
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
    async putEditConfig(data: any, id:string) {
        const uploaded = await httpPut('dashboard/style', data)
        return uploaded.data
    }
    async deleteConfig( data:any) {
        console.log('data',data);
        
        const uploaded = await httpPost('dashboard/delete-styles', data)
        return uploaded
    }
    async getAllConfigs() {
        const data = await httpGet('dashboard/style')
        return data.data
    }

    // getConfigDetail(id: string) {
    //     return httpGet('assets/demo/data/content-detail.json').then((res) => res.data.data);
    // }

    // deleteConfig(id: string) {
    //     return httpDelete('').then((res) => res.data.data);
    // }




}
