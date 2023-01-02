
import { httpGet } from '../HttpService';

export default class InterestTopicsService {
    getInterestTopicssSmall() {
        return httpGet('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getInterestTopicss() {
        return httpGet('assets/demo/data/interest-topics.json').then((res) => res.data.data);
    }

    getInterestTopicssMixed() {
        return httpGet('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getInterestTopicssWithOrdersSmall() {
        return httpGet('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
