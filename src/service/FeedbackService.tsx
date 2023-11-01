import { httpGet } from "./HttpService";



export default class FeedbackService {
    private static instance: FeedbackService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new FeedbackService();
        }
        return this.instance;
    }

    async getListFeedback() {
        const res = await httpGet('/dashboard/feedback');
        return res.data;
    }
}
