import { httpGet } from './HttpService';

export default class DashboardService {
    getCustomersSmall() {
        return httpGet('assets/demo/data/customers-small.json').then((res) => res.data.data);
    }

    getCustomersMedium() {
        return httpGet('assets/demo/data/customers-medium.json').then((res) => res.data.data);
    }

    getCustomersLarge() {
        return httpGet('assets/demo/data/customers-large.json').then((res) => res.data.data);
    }

    getCustomersXLarge() {
        return httpGet('assets/demo/data/customers-xlarge.json').then((res) => res.data.data);
    }

    getCustomersMixed() {
        return httpGet('assets/demo/data/customers-mixed.json').then((res) => res.data.data);
    }
}
