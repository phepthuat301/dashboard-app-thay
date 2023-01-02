
import { httpGet } from '../HttpService';

export default class KeenOnMeetingService {
    getKeenOnMeetingsSmall() {
        return httpGet('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getKeenOnMeetings() {
        return httpGet('assets/demo/data/keen-on-meeting.json').then((res) => res.data.data);
    }

    getKeenOnMeetingsMixed() {
        return httpGet('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getKeenOnMeetingsWithOrdersSmall() {
        return httpGet('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
