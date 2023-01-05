
import { httpGet } from '../HttpService';

export default class ProfileTypeService {
    private static instance: ProfileTypeService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ProfileTypeService();
        }
        return this.instance;
    }

    getProfileTypes() {
        return httpGet('../../../assets/demo/data/profile-type.json').then((res) => res.data.data);
    }
}
