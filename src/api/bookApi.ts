import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../types'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3006/' }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => 'books',
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: `books`,
        method: 'POST',
        body,
      }),
    }),
    updateBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: `books/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
    }),

    getBook: builder.query<Book, number>({
      query: (id) => `books/${id}`,
    }),

    getBookByTitle: builder.query<Book, string>({
      query: (title) => `books?title=${title}`,
    }),

    getBookByAuthor: builder.query<Book, string>({
      query: (author) => `books?author=${author}`,
    }),
  }),
})

export const { useGetBooksQuery, 
  useAddBookMutation, 
  useUpdateBookMutation, 
  useDeleteBookMutation, 
  useGetBookQuery, 
  useGetBookByTitleQuery, 
  useGetBookByAuthorQuery
} = bookApi
