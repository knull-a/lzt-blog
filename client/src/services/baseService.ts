import axios, { type AxiosError, type AxiosInstance } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { type Schema } from 'yup'

import type { WithAccessToken } from './user/types'

export class BaseService {
  protected readonly instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.accessTokenInterceptor()
    this.refreshTokenInterceptor()
  }

  private accessTokenInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('access_token')
        return Object.assign(config, {
          headers: {
            Authorization: accessToken ? `JWT ${accessToken}` : undefined
          }
        })
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  private refreshTokenInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError) => {
        if (
          !error.config ||
          !error.response ||
          (!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) ||
          (error.response.status !== 401 && error.response.status !== 403)
        ) {
          return Promise.reject(error)
        }

        if (
          error.config.retry &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          return Promise.reject(error)
        }

        try {
          const { accessToken } = await this.postData<WithAccessToken>({
            url: '/users/refresh/',
            data: {
              refreshToken: localStorage.getItem('refresh_token')
            },
            config: {
              retry: true
            }
          })

          localStorage.setItem('access_token', accessToken)

          return this.instance.request({
            ...error.config,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          })
        } catch (error) {
          console.error(error)

          localStorage.setItem('access_token', '')
          localStorage.setItem('refresh_token', '')
        }

        return Promise.reject(error)
      }
    )
  }

  private static async extractData<T>(request: Promise<AxiosResponse<T>>) {
    const { data } = await request
    return data
  }

  protected patchData<T>({
    url,
    data,
    config
  }: {
    url: string
    data?: object
    config?: AxiosRequestConfig
    schema?: Schema
  }) {
    return BaseService.extractData<T>(this.instance.patch<T>(url, data, config))
  }

  protected postData<T>({
    url,
    data,
    config
  }: {
    url: string
    data?: object
    config?: AxiosRequestConfig
    schema?: Schema
  }) {
    return BaseService.extractData<T>(this.instance.post<T>(url, data, config))
  }

  protected postForm<T>({
    url,
    data,
    config
  }: {
    url: string
    data?: object
    config?: AxiosRequestConfig
  }) {
    return BaseService.extractData<T>(this.instance.postForm<T>(url, data, config))
  }

  protected getData<T>({
    url,
    params,
    config
  }: {
    url: string
    params?: object
    config?: AxiosRequestConfig
    schema?: Schema
  }) {
    return BaseService.extractData<T>(this.instance.get<T>(url, { params, ...config }))
  }

  protected deleteData({ url, config }: { url: string; config?: AxiosRequestConfig }) {
    return BaseService.extractData(this.instance.delete(url, { ...config }))
  }
}
