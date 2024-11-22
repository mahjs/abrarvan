import axiosInstance from './axiosInstance'
import type { Article, CreateArticleReq } from './interfaces'

export const getAllArticles = async () => {
  const { data } = await axiosInstance.get<{ articles: Article[]; articlesCount: number }>(
    '/articles',
  )
  return data
}

export const getArticleBySlug = async (slug: string) => {
  const { data } = await axiosInstance.get<{ article: Article }>(`/articles/${slug}`)
  return data
}

export const deleteArticle = async (slug: string) => {
  const { data } = await axiosInstance.delete(`/articles/${slug}`)
  return data
}

export const createNewArticle = async (body: CreateArticleReq) => {
  const data = {
    article: body,
  }
  const { data: response } = await axiosInstance.post('/articles', data)

  return response
}
