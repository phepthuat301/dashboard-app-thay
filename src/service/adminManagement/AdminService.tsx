
import { httpDelete, httpGet, httpPost } from '../HttpService';

export default class AdminService {
    private static instance: AdminService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AdminService();
        }
        return this.instance;
    }

    async getAdmin() {
        const Admin = await httpGet('assets/demo/data/current-admin.json').then((res) => res.data.data);
        return Admin
    }

    async getAdmins() {
        try {
            const Admins = await httpGet('assets/demo/data/admin.json').then((res) => res.data.data);
            if (!Admins) {
                return {
                    total: 0,
                    data: []
                }
            }
            Admins.data = Admins.data.map((Admin: any) => {
                const created_at = new Date(Admin.created_at)
                const updated_at = new Date(Admin.updated_at)
                return { ...Admin, created_at, updated_at }
            })
            return Admins
        } catch (error) {
            return {
                total: 0,
                data: []
            }
        }
    }

    async getAdminDetail(id: string) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/admin-detail.json').then((res) => res.data.data);
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    deleteAdmin(id: string) {
        return httpDelete('').then((res) => res.data.data);
    }

    banAdmin(id: string) {
        if (!id) return;
        return httpDelete('').then((res) => res.data.data);
    }

    warningAdmin(id: string, warning: number) {
        if (!id) return;
        return httpDelete('').then((res) => res.data.data);
    }

    async getAllAdminActivities(options: {
        from?: Date;
        to?: Date;
        page: number
    }) {
        const result = await httpGet('assets/demo/data/admin-activities.json').then((res) => res.data.data);
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
    async getAdminActivities(id: string, options: {
        from?: Date;
        to?: Date;
        page: number
    }) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/admin-activities.json').then((res) => res.data.data);
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

    async getAdminFriend(id: string) {
        console.log(id);

        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/admin-friends.json').then((res) => res.data.data);
        result.data = result.data.map((Admin: any) => {
            const created_at = new Date(Admin.created_at)
            const updated_at = new Date(Admin.updated_at)
            return { ...Admin, created_at, updated_at }
        })
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    async getAdminFollower(id: string) {
        if (!id) return {
            total: 0,
            data: []
        }
        const result = await httpGet('assets/demo/data/admin-followers.json').then((res) => res.data.data);
        result.data = result.data.map((Admin: any) => {
            const created_at = new Date(Admin.created_at)
            const updated_at = new Date(Admin.updated_at)
            return { ...Admin, created_at, updated_at }
        })
        if (!result) {
            return {
                total: 0,
                data: []
            }
        }
        return result

    }

    async getAllAdminList() {
        const Admins = await httpGet('assets/demo/data/all-admin.json').then((res) => res.data.data);
        if (!Admins) {
            return []
        }
        return Admins
    }

    async getAllRoles() {
        const Admins = await httpGet('assets/demo/data/all-roles.json').then((res) => res.data.data);
        if (!Admins) return []
        return Admins
    }

    async setRolesById(id: string, roles: { name: string, code: string }) {
        const Admins = await httpPost('assets/demo/data/all-roles.json', {
            id,
            roles
        }).then((res) => res.data.data);
        if (!Admins) return []
        return Admins
    }

    async getAdminRolesByID(id: string) {
        const Admins = await httpGet('assets/demo/data/all-roles.json').then((res) => res.data.data);
        if (!Admins) return []
        return Admins
    }
}
