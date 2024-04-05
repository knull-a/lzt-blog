import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: boolean
  }
}

export type PaginationType = {
  limit?: number
  start?: number
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}
