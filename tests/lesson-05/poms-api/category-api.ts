import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "./base-api";

export class CategoryAPI extends BaseAPI {
    
    constructor(request: APIRequestContext){
        super(request);
    }

    async create(categoryData: any){
        const rawResponse = await this.request.post(`${this.baseUrl}/category/create.php`,{
            data: JSON.stringify(categoryData)
        });
        return (await this.validateResponse(rawResponse)).json();
    }

    async delete(categoryId: string){
        const rawResponse = await this.request.delete(`${this.baseUrl}/category/delete.php?id=${categoryId}`);
        return (await this.validateResponse(rawResponse)).json();
    }
}