
import { httpGet } from '../HttpService';

export default class KeenOnMeetingService {
    private static instance: KeenOnMeetingService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new KeenOnMeetingService();
        }
        return this.instance;
    }

    getKeenOnMeetings() {
        return httpGet('assets/demo/data/keen-on-meeting.json').then((res) => res.data.data);
    }


}
