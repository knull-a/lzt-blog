export type UserMe = {
  email: string
}

export type UserDto = UserMe & {
  password: string
}

export type UserData = WithRefreshToken & WithAccessToken

export type WithRefreshToken = {
  refreshToken: string
}

export type WithAccessToken = {
  accessToken: string
}

export type AuthorData = {
  name?: string
  role?: UserRole
  id: number
  email: string
  password: string
}

export type UserRole = 'ADMIN' | 'USER'
