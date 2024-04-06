import { BaseService } from '../baseService'
import type { UserMe, UserData, UserDto, AuthorData } from './types'

class UserService extends BaseService {
  register(data: UserDto) {
    return this.postData<UserData>({ url: '/users/register', data })
  }

  login(data: UserDto) {
    return this.postData<UserData>({ url: '/users/login', data })
  }

  getUserMe() {
    return this.getData<UserMe>({ url: '/users/me' })
  }

  getUsers() {
    return this.getData<AuthorData[]>({ url: '/users' })
  }

  deleteUser(id: number) {
    return this.deleteData({ url: `/users/${id}` })
  }

  // todo: add user editing
}

export default new UserService()
