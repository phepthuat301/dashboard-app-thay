
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

    async getContents() {
        const contents = await httpGet('assets/demo/data/content.json').then((res) => res.data.data);
        contents.data = contents.data.map((content: any) => {
            const created_at = new Date(content.created_at)
            const updated_at = new Date(content.updated_at)
            return { ...content, created_at, updated_at }
        })
        return contents
    }

    getContentDetail(id: string) {
        return httpGet('assets/demo/data/content-detail.json').then((res) => res.data.data);
    }

    async getContentComments(id: string) {
        const contents = await httpGet('assets/demo/data/comments.json').then((res) => res.data.data);
        contents.data = contents.data.map((content: any) => {
            const created_at = new Date(content.created_at)
            const updated_at = new Date(content.updated_at)
            return { ...content, created_at, updated_at }
        })
        return contents
    }

    async getContentReports(id: string) {
        const contents = await httpGet('assets/demo/data/content-report.json').then((res) => res.data.data);
        contents.data = contents.data.map((content: any) => {
            const created_at = new Date(content.created_at)
            const updated_at = new Date(content.updated_at)
            return { ...content, created_at, updated_at }
        })
        return contents
    }

    deleteContent(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }

    reportContent(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }


}
