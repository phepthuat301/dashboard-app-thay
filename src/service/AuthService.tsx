import { httpGet, httpPost } from "./HttpService";
import { deleteToken, persistToken } from "./LocalStorageService";

export default class AuthService {
    private static instance: AuthService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
    async login(email: string, password: string) {
        const res = await httpPost("/login", {
            email,
            password
        }).then((res) => res.data)
        if (res?.token)
            persistToken(res?.token)
        return res
    }

    async logout() {
        const res = await httpGet("assets/demo/data/logout.json")
            .then((res) => res.data.data)
            .finally(() => {
                deleteToken()
                window.location.reload()
            })

        return res
    }
}
