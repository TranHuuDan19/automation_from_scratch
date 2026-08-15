import { APIRequestContext } from '@playwright/test';
import env from '../../utils/config/env';

export class BaseClient {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = env.baseURL;
  }

  protected async get(endpoint: string, options?: any) {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, options);
    return response;
  }

  protected async post(endpoint: string, options?: any) {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, options);
    return response;
  }
}
