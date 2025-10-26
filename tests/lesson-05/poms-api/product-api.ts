import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "./base-api";

export class ProductAPI extends BaseAPI {
    
    constructor(request: APIRequestContext){
       super(request);
    }

    async create(productData: any){
        const rawResponse = await this.request.post(`${this.baseUrl}/product/create.php`, {
            data: JSON.stringify(productData),
        });
        return (await this.validateResponse(rawResponse)).json();
    }

    async update(newProductData: any){
        const rawResponse = await this.request.put(`${this.baseUrl}/product/update.php`, {
            data: JSON.stringify(newProductData),
        });
        return (await this.validateResponse(rawResponse)).json();
    }

    async delete(productId: string){
        const rawResponse = await this.request.delete(`${this.baseUrl}/product/delete.php?id=${productId}`);
        return (await this.validateResponse(rawResponse)).json();
    }
}