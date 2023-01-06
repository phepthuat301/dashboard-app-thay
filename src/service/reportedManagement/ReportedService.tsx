
import { httpDelete, httpGet } from '../HttpService';

export default class ReportedService {
    private static instance: ReportedService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ReportedService();
        }
        return this.instance;
    }
    async getReporteds() {
        const reporteds = await httpGet('../../../assets/demo/data/reported.json').then((res) => res.data.data)
        reporteds.data = reporteds.data.map((reported: any) => {
            const created_at = new Date(reported.created_at)
            const updated_at = new Date(reported.updated_at)
            return { ...reported, created_at, updated_at }
        })
        return reporteds;
    }
    deleteReported(id: string) {
        return httpDelete('../../../assets/demo/data/reported.json').then((res) => res.data.data);
    }

    banReported(id: string) {
        return httpDelete('../../../assets/demo/data/reported.json').then((res) => res.data.data);
    }
}
