export type CommentData = {
  text: string
  id: number
  updatedAt: string
  createdAt: string
  authorId: number
  articleId: number
}

export type CommentDto = { text: string; articleId: number }
