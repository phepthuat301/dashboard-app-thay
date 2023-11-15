import { httpGet } from "./HttpService";



export default class PatientService {
    private static instance: PatientService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PatientService();
        }
        return this.instance;
    }

    async getListPatient(page: number, limit: number) {
        const res = await httpGet(`/v1/dashboard/patient?page=${page}&limit=${limit}`);
        return res.data;
    }

    async getPatientDetail(page: number, limit: number, id: string) {
        const res = await httpGet(`/v1/dashboard/patient/${id}?page=${page}&limit=${limit}`);
        return res.data;
    }
}
