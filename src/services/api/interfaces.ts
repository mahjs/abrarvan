export interface LoginReq {
  email: string
  password: string
}

export interface RegisterReq {
  email: string
  password: string
  username: string
}

export interface CurrentUser {
  user: {
    id: number
    email: string
    username: string
    bio: string
    image: string
    token: string
  }
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export interface CreateArticleReq {
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface EditArticleReq {
  title?: string
  description?: string
  body?: string
  tagList?: string[]
}
