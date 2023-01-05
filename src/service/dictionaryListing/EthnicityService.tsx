
import { httpGet } from '../HttpService';

export default class EthnicityService {
    private static instance: EthnicityService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new EthnicityService();
        }
        return this.instance;
    }

    getEthnicitys() {
        return httpGet('../../../assets/demo/data/ethnicity.json').then((res) => res.data.data);
    }
}
