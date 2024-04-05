import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    retry?: boolean;
  }
}

export type PaginationType = {
  limit?: number
  start?: number
}