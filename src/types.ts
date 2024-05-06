import { store } from "./store"

export interface Book {
  id: number
  title: string
  author: string
  pages: string
  status: string
  user_id: number
  isbn: string
  cover: string
  published: string
}

export interface User {
  id: number
  username: string
  password: string
  email: string
  secret: string
}

export interface RootState {
  bookApi: ReturnType<typeof store.getState>
  userApi: ReturnType<typeof store.getState>
}
