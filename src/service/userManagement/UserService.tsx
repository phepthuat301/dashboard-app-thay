
import { httpDelete, httpGet, httpPost } from '../HttpService';

export default class UserService {
    private static instance: UserService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    async getUser() {
        // const user = await httpGet('/account/user-info').then((res) => res.data.data);
        return {}
    }

    async getUsers() {
        const users = await httpGet('assets/demo/data/user.json').then((res) => res.data.data);
        if (!users) {
            return {
                total: 0,
                data: []
            }
        }
        users.data = users.data.map((user: any) => {
            const created_at = new Date(user.created_at)
            const updated_at = new Date(user.updated_at)
            return { ...user, created_at, updated_at }
        })
        return users
    }

    async getUserDetail(id: string) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/user-detail.json').then((res) => res.data.data);
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    deleteUser(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }

    banUser(id: string) {
        if (!id) return;
        return httpDelete('').then((res) => res.data.data);
    }

    warningUser(id: string, warning: number) {
        if (!id) return;
        return httpDelete('').then((res) => res.data.data);
    }

    async getUserActivities(id: string, options: {
        from?: Date;
        to?: Date;
        page: number
    }) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/user-activities.json').then((res) => res.data.data);
        result.data = result.data.map((user: any) => {
            const created_at = new Date(user.created_at)
            const updated_at = new Date(user.updated_at)
            return { ...user, created_at, updated_at }
        })
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result
    }




    async getUserFriend(id: string) {
        console.log(id);

        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/user-friends.json').then((res) => res.data.data);
        result.data = result.data.map((user: any) => {
            const created_at = new Date(user.created_at)
            const updated_at = new Date(user.updated_at)
            return { ...user, created_at, updated_at }
        })
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    async getUserFollower(id: string) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/user-followers.json').then((res) => res.data.data);
        result.data = result.data.map((user: any) => {
            const created_at = new Date(user.created_at)
            const updated_at = new Date(user.updated_at)
            return { ...user, created_at, updated_at }
        })
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    async getRoles() {
        const users = await httpGet('assets/demo/data/roles.json').then((res) => res.data.data);
        if (!users) return []
        return users
    }

    async getAllRoles() {
        const users = await httpGet('assets/demo/data/all-roles.json').then((res) => res.data.data);
        if (!users) return []
        return users
    }

    async getAllPermission() {
        const users = await httpGet('assets/demo/data/user-all-permission.json').then((res) => res.data.data);
        if (!users) return []
        return users
    }

    async setRolesById(id: string, roles: { name: string, code: string }) {
        const users = await httpPost('', {
            id,
            roles
        }).then((res) => res.data.data);
        if (!users) return []
        return users
    }

    async getUserRolesByID(id: string) {
        const users = await httpGet('assets/demo/data/all-roles.json').then((res) => res.data.data);
        if (!users) return []
        return users
    }

    async bacthUpdateSelectUser(options: any) {
        const users = await httpGet('assets/demo/data/bacth-update-selected-user.json').then((res) => res.data.data);
        if (!users) return []
        return users
    }
}
