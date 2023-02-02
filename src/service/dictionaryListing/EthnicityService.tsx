
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class EthnicityService {
    private static instance: EthnicityService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new EthnicityService();
        }
        return this.instance;
    }

    async getEthnicity() {
        const res = await httpGet('/dashboard/ethnicity');
        return res.data;
    }

    async addEthnicity(key: string, value: string) {
        const res = await httpPost('/dashboard/ethnicity', { key, value });
        return res.data;
    }

    async editEthnicity(data: { id: string, key: string, value: string }) {
        const res = await httpPut('/dashboard/ethnicity', data);
        return res.data;
    }

    async deleteEthnicity(id: string) {
        const res = await httpDelete(`/dashboard/ethnicity/${id}`);
        return res.data;
    }

    async deleteEthnicitys(id: string[]) {
        const res = await httpPost(`/dashboard/ethnicity/delete-many`, id);
        return res.data;
    }

    getAllEthnicitys() {
        return httpGet('assets/demo/data/all-ethnicity.json').then((res) => res.data.data);
    }
}
