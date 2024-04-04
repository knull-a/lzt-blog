import { BaseService } from '../baseService'
import type { UserMe, UserData, UserDto } from './types'

class UserService extends BaseService {
  register(data: UserDto) {
    return this.postData<UserData>({ url: '/users/register/', data })
  }

  login(data: UserDto) {
    return this.postData<UserData>({ url: '/users/login/', data })
  }

  getUserMe() {
    return this.getData<UserMe>({ url: '/users/me/' })
  }

  // todo: add user editing
}

export default new UserService()
