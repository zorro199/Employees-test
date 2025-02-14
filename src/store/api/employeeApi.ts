import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IEmployee } from '../../types/types'

const API_URL = 'http://localhost:3000/'

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['employee'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: builder => ({
        getEmployee: builder.query<IEmployee[], null> ({
            query: () => '/employee',
            providesTags: ['employee']
        }),
        updateEmployee: builder.mutation<IEmployee[], Partial<IEmployee>> ({
            query: (body) => ({
                url: `/employee/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['employee']
        }),
        addEmployee: builder.mutation<IEmployee[], Partial<IEmployee>> ({
            query: (body) => ({
                url: '/employee',
                method: 'POST',
                body
            }),
            invalidatesTags: ['employee']
        })
    })
})

export const { useGetEmployeeQuery, useUpdateEmployeeMutation, useAddEmployeeMutation } = api