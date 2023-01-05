
import { httpGet } from '../HttpService';

export default class ReportedService {
    private static instance: ReportedService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ReportedService();
        }
        return this.instance;
    }
    getReporteds() {
        return httpGet('../../../assets/demo/data/reported.json').then((res) => res.data.data);
    }
}
