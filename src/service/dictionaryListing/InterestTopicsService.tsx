
import { httpGet } from '../HttpService';

export default class InterestTopicsService {
    private static instance: InterestTopicsService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new InterestTopicsService();
        }
        return this.instance;
    }
    getInterestTopicss() {
        return httpGet('assets/demo/data/interest-topics.json').then((res) => res.data.data);
    }
}
