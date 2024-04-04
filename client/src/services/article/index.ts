import { BaseService } from '../baseService'
import type { ArticleData, ArticleDataDto } from './types'

class ArticleService extends BaseService {
  getArticles() {
    return this.getData<ArticleData[]>({ url: '/articles/' })
  }

  getArticleById(id: number) {
    return this.getData<ArticleData>({ url: `/articles/${id}/`, params: { id } })
  }

  createArticle(data: ArticleDataDto) {
    return this.postData<ArticleDataDto>({ url: '/articles/', data })
  }

  updateArticle(id: number, data: Partial<ArticleDataDto>) {
    return this.patchData<ArticleDataDto>({ url: `/articles/${id}/`, data })
  }

  deleteArticle(id: number) {
    return this.deleteData({ url: `/articles/${id}/` })
  }
}

export default new ArticleService()
