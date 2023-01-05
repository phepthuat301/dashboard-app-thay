
import { httpDelete, httpGet } from '../HttpService';

export default class UserService {
    private static instance: UserService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    getUsers() {
        return httpGet('../../../assets/demo/data/user.json').then((res) => res.data.data);
    }

    getUserDetail(id: string) {
        return httpGet('../../../assets/demo/data/user-detail.json').then((res) => res.data.data);
    }

    deleteUser(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }


}
