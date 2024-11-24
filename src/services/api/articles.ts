import axiosInstance from './axiosInstance'
import type { Article, CreateArticleReq, EditArticleReq } from './interfaces'

export const getArticles = async (page = 1) => {
  const { data } = await axiosInstance.get<{ articles: Article[]; articlesCount: number }>(
    `/articles${page > 1 ? `/page/${page}` : ''}`,
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
  console.log('heheheheh')

  const data = {
    article: body,
  }
  const { data: response } = await axiosInstance.post('/articles', data)

  return response
}

export const editArticle = async (slug: string, body: EditArticleReq) => {
  const data = {
    article: body,
  }
  const { data: response } = await axiosInstance.put(`/articles/${slug}`, data)

  return response
}
