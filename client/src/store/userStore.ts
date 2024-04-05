import { useLocalStorage, type RemovableRef } from '@vueuse/core'

import AuthService from '@/services/user'
import type { UserDto, AuthorData } from '@/services/user/types'
import UsersService from '@/services/user'
import { defineStore } from 'pinia'
import type { Nullable } from '@/services/types'

export const useUserStore = defineStore('user', {
  state() {
    return {
      id: null,
      name: null,
      role: null,
      email: null,
      password: null
    } as Nullable<AuthorData>
  },
  getters: {
    accessToken(): RemovableRef<string> {
      return useLocalStorage('access_token', '')
    },
    refreshToken(): RemovableRef<string> {
      return useLocalStorage('refresh_token', '')
    },
    isAuthenticated(): boolean {
      return this.id !== null
    }
  },
  actions: {
    async initialize() {
      if (this.isAuthenticated) {
        return this.$state
      }

      try {
        const userMe = await UsersService.getUserMe()
        Object.assign(this, userMe)
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    async signIn(values: UserDto) {
      const { accessToken, refreshToken } = await AuthService.login(values)

      this.accessToken.value = accessToken ?? ''
      this.refreshToken.value = refreshToken ?? ''

      await this.initialize()
    },

    async signUp(values: UserDto) {
      const { accessToken, refreshToken } = await AuthService.register(values)

      this.accessToken.value = accessToken ?? ''
      this.refreshToken.value = refreshToken ?? ''

      await this.initialize()
    },

    logOut() {
      this.accessToken.value = ''
      this.refreshToken.value = ''

      this.$reset()
    },

    setAccessToken(data: string | null) {
      this.accessToken.value = data ?? ''
    },

    setRefreshToken(data: string | null) {
      this.refreshToken.value = data ?? ''
    }
  }
})
