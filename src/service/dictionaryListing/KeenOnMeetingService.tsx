
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class KeenOnMeetingService {
    private static instance: KeenOnMeetingService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new KeenOnMeetingService();
        }
        return this.instance;
    }

    async getKeenOnMeeting() {
        const res = await httpGet('/dashboard/keen-on-meeting');
        return res.data;
    }

    async addKeenOnMeeting(key: string, value: string) {
        const res = await httpPost('/dashboard/keen-on-meeting', { key, value });
        return res.data;
    }

    async editKeenOnMeeting(data: { id: string, key: string, value: string }) {
        const res = await httpPut('/dashboard/keen-on-meeting', data);
        return res.data;
    }

    async deleteKeenOnMeeting(id: string) {
        const res = await httpDelete(`/dashboard/keen-on-meeting/${id}`);
        return res.data;
    }

    async deleteKeenOnMeetings(id: string[]) {
        const res = await httpPost(`/dashboard/keen-on-meeting/delete-many`, id);
        return res.data;
    }

    getAllKeenOnMeetings() {
        return httpGet('assets/demo/data/all-keen-on-meeting.json').then((res) => res.data.data);
    }
}
