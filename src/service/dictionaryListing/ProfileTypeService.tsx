
import { httpGet } from '../HttpService';

export default class ProfileTypeService {
    getProfileTypesSmall() {
        return httpGet('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getProfileTypes() {
        return httpGet('assets/demo/data/profile-type.json').then((res) => res.data.data);
    }

    getProfileTypesMixed() {
        return httpGet('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getProfileTypesWithOrdersSmall() {
        return httpGet('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
