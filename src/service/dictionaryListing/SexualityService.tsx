
import { httpGet } from '../HttpService';

export default class SexualityService {
    getSexualitysSmall() {
        return httpGet('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getSexualitys() {
        return httpGet('assets/demo/data/sexuality.json').then((res) => res.data.data);
    }

    getSexualitysMixed() {
        return httpGet('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getSexualitysWithOrdersSmall() {
        return httpGet('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
