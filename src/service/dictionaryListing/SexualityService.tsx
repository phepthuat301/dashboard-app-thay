
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class SexualityService {
    private static instance: SexualityService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new SexualityService();
        }
        return this.instance;
    }

    async getSexuality() {
        const res = await httpGet('/dashboard/sexuality');
        return res.data;
    }

    async addSexuality(key: string, value: string) {
        const res = await httpPost('/dashboard/sexuality', { key, value });
        return res.data;
    }

    async editSexuality(data: { id: string, key: string, value: string }) {
        const res = await httpPut('/dashboard/sexuality', data);
        return res.data;
    }

    async deleteSexuality(id: string) {
        const res = await httpDelete(`/dashboard/sexuality/${id}`);
        return res.data;
    }

    async deleteSexualities(id: string[]) {
        const res = await httpPost(`/dashboard/sexuality/delete-many`, id);
        return res.data;
    }

    getAllSexualitys() {
        return httpGet('assets/demo/data/all-sexuality.json').then((res) => res.data.data);
    }
}
