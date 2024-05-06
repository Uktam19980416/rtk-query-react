import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3006/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<User, Partial<User>>({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useAddUserMutation, useLoginMutation } = userApi
