import { BaseService } from '../baseService'
import type { CommentData, CommentDto } from './types'

class CommentService extends BaseService {
  getComments() {
    return this.getData<CommentData[]>({ url: '/comments/' })
  }

  getCommentById(id: number) {
    return this.getData<CommentData>({ url: `/comments/${id}/`, params: { id } })
  }

  createComment(data: CommentDto) {
    return this.postData<CommentDto>({ url: '/comments/', data })
  }

  updateComment(id: number, data: Partial<CommentDto>) {
    return this.patchData<CommentDto>({ url: `/comments/${id}/`, data })
  }

  deleteComment(id: number) {
    return this.deleteData({ url: `/comments/${id}/` })
  }
}

export default new CommentService()
