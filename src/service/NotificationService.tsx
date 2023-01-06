
import { httpGet } from './HttpService';

export default class NotificationService {
    private static instance: NotificationService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new NotificationService();
        }
        return this.instance;
    }
    getNotificationsSmall() {
        return httpGet('assets/demo/data/notifications-small.json').then((res) => res.data.data);
    }

    getNotifications() {
        return httpGet('assets/demo/data/notifications.json').then((res) => res.data.data);
    }

    getNotificationsMixed() {
        return httpGet('assets/demo/data/notifications-mixed.json').then((res) => res.data.data);
    }

    getNotificationsWithOrdersSmall() {
        return httpGet('assets/demo/data/notifications-orders-small.json').then((res) => res.data.data);
    }
}
