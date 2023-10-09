import axios, { AxiosRequestConfig, ResponseType } from 'axios'

export class AxiosService {
  readonly service

  constructor(contentType: string, accessToken?: string) {
    const service = axios.create({
      withCredentials: false,
      responseType: 'json',
      baseURL: 'http://localhost:5000/api/v1' || '',
      headers: {
        'Content-Type': contentType,
        Accept: contentType,
        Authorization: 'Bearer ' + accessToken
      }
    })
    service.interceptors.request.use(this.handleInterceptRequest)
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }

  setHeader(name: any, value: any) {
    this.service.defaults.headers.common[name] = value
  }

  removeHeader(name: string) {
    delete this.service.defaults.headers.common[name]
  }

  handleInterceptRequest(config: any) {
    return config
  }

  handleSuccess(response: any) {
    return response.data
  }

  handleError = (error: any) => {
    throw error
  }

  redirectTo = (document: any, path: string) => {
    document.location = path
  }

  async get(endpoint: string, options?: AxiosRequestConfig) {
    return this.service.get(endpoint, options)
  }

  async post(endpoint: string, payload: any, options?: AxiosRequestConfig) {
    return this.service.post(endpoint, payload, options)
  }

  async put(endpoint: string, payload: any, options?: AxiosRequestConfig) {
    return this.service.put(endpoint, payload, options)
  }

  async patch(endpoint: string, payload: any, options?: AxiosRequestConfig) {
    return this.service.patch(endpoint, payload, options)
  }

  async delete(endpoint: string, options?: AxiosRequestConfig) {
    return this.service.delete(endpoint, options)
  }
}

export default AxiosService
