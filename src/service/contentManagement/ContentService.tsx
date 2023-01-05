
import { httpDelete, httpGet } from '../HttpService';

export default class ContentService {
    private static instance: ContentService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ContentService();
        }
        return this.instance;
    }

    getContents() {
        return httpGet('../../../assets/demo/data/content.json').then((res) => res.data.data);
    }

    getContentDetail(id: string) {
        return httpGet('../../../assets/demo/data/content-detail.json').then((res) => res.data.data);
    }

    deleteContent(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }


}
