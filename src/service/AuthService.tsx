import { httpGet } from "./HttpService";
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
        // return httpPost("assets/demo/data/login.json", {
        //     email,
        //     password
        // })
        const res = await httpGet("assets/demo/data/login.json").then((res) => res.data.data)
        if (res?.accessToken)
            persistToken(res?.accessToken)
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
