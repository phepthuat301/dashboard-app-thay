
import { httpGet } from '../HttpService';

export default class EthnicityService {
    getEthnicitysSmall() {
        return httpGet('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getEthnicitys() {
        return httpGet('assets/demo/data/ethnicity.json').then((res) => res.data.data);
    }

    getEthnicitysMixed() {
        return httpGet('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getEthnicitysWithOrdersSmall() {
        return httpGet('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
