
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class InterestTopicsService {
    private static instance: InterestTopicsService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new InterestTopicsService();
        }
        return this.instance;
    }

    async getTopic() {
        const res = await httpGet('/dashboard/topic');
        return res.data;
    }

    async addTopic(key: string, value: string) {
        const res = await httpPost('/dashboard/topic', { key, value });
        return res.data;
    }

    async editTopic(data: { id: string, key: string, value: string }) {
        const res = await httpPut('/dashboard/topic', data);
        return res.data;
    }

    async deleteTopic(id: string) {
        const res = await httpDelete(`/dashboard/topic/${id}`);
        return res.data;
    }

    async deleteTopics(id: string[]) {
        const res = await httpPost(`/dashboard/topic/delete-many`, id);
        return res.data;
    }
    getAllInterestTopicss() {
        return httpGet('assets/demo/data/all-interest-topics.json').then((res) => res.data.data);
    }
}
