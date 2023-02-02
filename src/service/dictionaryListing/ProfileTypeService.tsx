
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class ProfileTypeService {
    private static instance: ProfileTypeService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ProfileTypeService();
        }
        return this.instance;
    }

    async getProfileType() {
        const res = await httpGet('/dashboard/profile-type');
        return res.data;
    }

    async addProfileType(key: string, value: string) {
        const res = await httpPost('/dashboard/profile-type', { key, value });
        return res.data;
    }

    async editProfileType(data: { id: string, key: string, value: string }) {
        const res = await httpPut('/dashboard/profile-type', data);
        return res.data;
    }

    async deleteProfileType(id: string) {
        const res = await httpDelete(`/dashboard/profile-type/${id}`);
        return res.data;
    }

    async deleteProfileTypes(id: string[]) {
        const res = await httpPost(`/dashboard/profile-type/delete-many`, id);
        return res.data;
    }
    
    async getAllProfileTypes() {
        const res = await httpGet('assets/demo/data/all-profile-type.json');
        return res.data.data;
    }
}
