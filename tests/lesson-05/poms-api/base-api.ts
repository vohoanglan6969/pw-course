import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseAPI {
    protected request: APIRequestContext;
    readonly baseUrl = process.env.API_BASE_URL;

    constructor(request: APIRequestContext){
        this.request = request;
        if(!this.baseUrl){
            throw new Error('Missing API BASE URL!');
        }
    }

    protected async validateResponse(response: APIResponse): Promise<APIResponse> {
        if (!response.ok()) {
            const statusCode = response.status();
            const statusText = response.statusText();
            
            let errorDetails = '';
            try {
                const body = await response.json();
                errorDetails = body.error?.message || body.message || JSON.stringify(body);
            } catch {
                errorDetails = await response.text().catch(() => 'No response body');
            }

            throw new Error(
                `API request failed with status ${statusCode} ${statusText}: ${errorDetails}`
            );
        }
        
        return response;
    }
}