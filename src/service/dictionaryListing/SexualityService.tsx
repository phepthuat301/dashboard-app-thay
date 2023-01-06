
import { httpGet } from '../HttpService';

export default class SexualityService {
    private static instance: SexualityService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new SexualityService();
        }
        return this.instance;
    }

    getSexualitys() {
        return httpGet('assets/demo/data/sexuality.json').then((res) => res.data.data);
    }


}
