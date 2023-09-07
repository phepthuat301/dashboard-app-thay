
import { httpDelete, httpGet, httpPost, httpPut } from '../HttpService';

export default class ConfigService {
    private static instance: ConfigService;
    private constructor() { }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ConfigService();
        }
        return this.instance;
    }
    async postUploadConfig(data: any) {
        const uploaded = await httpPost('dashboard/import-style', data)
        return uploaded.data
    }
    async putEditConfig(data: any) {   
        const uploaded = await httpPut('dashboard/style', data)
        return uploaded.data
    }
    async deleteConfig( data:any) {  
        const uploaded = await httpPost('dashboard/delete-styles', data)
        return uploaded
    }
    async getAllConfigs() {
        const data = await httpGet('dashboard/style')
        return data.data
    }
    async getAllPromptCustomize() {
        const data = await httpGet('/dashboard/custom')
        return data.data
    }
    async putEditPromptCustomize(data: any) {
        const uploaded = await httpPut('dashboard/custom', data)
        return uploaded.data
    }
    async addNewConfigs(dataValue:any) {
        const data = await httpPost('dashboard/style',dataValue)
        return data.data
    }
    async uploadImage(file: any) {
       const data= await  httpGet(`dashboard/signed-url?fileName=${new Date().getTime()}-${file.name}&fileType=${file.type}`)
       return data.data  
    }
    uploadFileS3(file: any, signedRequest: string, url: string)  {
        const xhr = new XMLHttpRequest();
         xhr.open("PUT", signedRequest);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
             return url
            } else {
            //   alert("Could not upload file.");
            }
          }
        };
        xhr.send(file);
      };

    // getConfigDetail(id: string) {
    //     return httpGet('assets/demo/data/content-detail.json').then((res) => res.data.data);
    // }

    // deleteConfig(id: string) {
    //     return httpDelete('').then((res) => res.data.data);
    // }




}
