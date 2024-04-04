import type { CommentData } from '../comment/types'
import type { AuthorData } from '../user/types'

export type ArticleData = {
  id: number
  title: string
  text: string
  author: AuthorData
  updatedAt: string
  createdAt: string
  comments: CommentData[]
}

export type ArticleDataDto = {
  title: string
  text: string
}
